# Analyse Complète du Panier de Commande Frontend

## Architecture Globale

L'architecture utilise **React Context API** (`CartContext` + `CartProvider`) avec un état de forme `Map<foodId, { quantity: number }>`. L'ajout/suppression se fait depuis la page Menu, et une page Cart affiche le résumé. C'est un bon point de départ, mais il y a des problèmes significatifs à chaque couche.

---

## 🔴 ERREURS CRITIQUES

### 1. `removeFromCart` plante si la clé n'existe pas

**Fichier :** `CartProvider.jsx:26`

```js
CartCopy[foodId]["quantity"] -= 1; // TypeError si CartCopy[foodId] est undefined
```

Si `removeFromCart` est appelé avec un `foodId` absent du panier, on accède à `.quantity` de `undefined` → crash. Il manque une garde :

```js
if (!CartCopy[foodId]) return;
```

### 2. Duplication de `useContext(CartContext)` dans le même composant

**Fichier :** `Menu.jsx:84,86`

```js
const {Cart} = useContext(CartContext);              // ligne 84
const {addToCart, removeFromCart} = useContext(CartContext); // ligne 86
```

Deux appels `useContext` distincts pour le même contexte. Cela devrait être un seul destructuring. Pas un bug runtime, mais c'est une mauvaise pratique qui crée deux souscriptions séparées au même provider.

### 3. Boucle infinie potentielle dans le `useEffect` de Menu

**Fichier :** `Menu.jsx:88-92`

```js
useEffect(() => {
    if (Cart[food.id]) {
        setCount(Cart[food.id].quantity)
    }
}, [Cart, count, food.id, setCount]);
```

`count` est dans le tableau des dépendances. `setCount` modifie `count`, ce qui redéclenche le `useEffect`, qui rappelle `setCount` → **boucle infinie** (stoppée uniquement par la condition `if`). C'est fragile et incorrect. `count` ne devrait **jamais** être dans les dépendances de cet effet.

### 4. La page Cart fetch tous les plats à chaque changement du panier

**Fichier :** `Cart.jsx:40-51`

```js
useEffect(() => {
    handleFoods().then(res => {       // GET /dishes à CHAQUE modification du panier
        handleCartItems(Cart, res).then(...)
    })
}, [Cart]); // [Cart] change à chaque ajout/suppression
```

Chaque `addToCart`/`removeFromCart` déclenche un appel API `GET /dishes`. C'est **inefficace** et **inutile** — la liste des plats ne change pas entre deux ajouts. Les données devraient être fetchées une seule fois et mises en cache.

### 5. `handleCartItems` est async sans raison

**Fichier :** `services/cart.js:3`

La fonction ne fait aucun `await`, aucune opération asynchrone. Elle retourne un tableau synchronement wrappé dans une Promise. Cela force les consommateurs à utiliser `.then()` inutilement au lieu d'un simple `const items = handleCartItems(...)`.

---

## 🟡 PROBLÈMES DE DESIGN / BONNES PRATIQUES

### 6. Aucune persistance — le panier est perdu au refresh

Pas de `localStorage`, pas d'API backend. L'état vit uniquement dans `useState({})`. C'est le problème le plus impactant pour l'expérience utilisateur.

### 7. `structuredClone` est surdimensionné pour votre cas

```js
const CartCopy = structuredClone(Cart)
```

Le panier est un objet plat 2 niveaux `{ id: { quantity } }`. Un simple spread suffit :

```js
const CartCopy = { ...Cart, [foodId]: { quantity: (Cart[foodId]?.quantity || 0) + 1 } }
```

`structuredClone` est coûteux et conçu pour des structures deeply nested. Ici, un spread de premier niveau avec réécriture ciblée est plus performant et plus lisible.

### 8. Le state expose `setCart` — brise l'encapsulation

```js
const states = { Cart, setCart, addToCart, removeFromCart }
```

Exposer le setter brut permet à n'importe quel composant de remplacer le panier sans passer par les opérations contrôlées. C'est une faille d'architecture. Le setter ne devrait jamais être exposé.

### 9. Pas de `clearCart`, `setQuantity`, ni `getItemQuantity`

Il manque les opérations suivantes :
- `clearCart()` — vider le panier
- `setQuantity(foodId, qty)` — mettre à jour directement une quantité
- `getItemQuantity(foodId)` — lire la quantité d'un élément
- `getTotalItems()` — nombre total d'articles (pour un badge dans la navbar)

### 10. Le hook `useCart.js` est du code mort avec des bugs

`useCart.js` mélange logique array (`Cart.length`, `prevState.push()`) et logique object (`delete prevState[dish_.id]`). Il n'est importé nulle part. Il devrait être supprimé.

### 11. Les boutons +/- et "remove" dans `Cart.jsx` n'ont pas de `onClick`

Les boutons de la page Cart (`Cart.jsx:99-105, 110`) sont purement visuels. Aucun handler n'est connecté. L'utilisateur ne peut pas modifier les quantités depuis la page panier.

### 12. La page Checkout/Payment affiche des valeurs hardcodées

`Checkout.jsx:128-143` et `Payment.jsx` utilisent des prix fictifs ($42.50, $122.30...) au lieu de lire depuis `CartContext`. Les totaux ne correspondent même pas entre eux ($42.50 + $5.00 + $4.00 ≠ $42.00).

---

## 🟢 RÉUSSITES

1. **Le pattern Context + Provider** est adapté à la scale actuelle. Pour un panier simple, React Context est suffisant (pas besoin de Redux/Zustand pour l'instant).

2. **La séparation des concerns** dans `CartProvider.jsx` est correcte — les opérations métier sont isolées du rendu.

3. **La fonction `handleCartItems`** (`services/cart.js`) est une bonne idée de séparer la jointure panier/données, même si la forme (async) est incorrecte.

4. **La structure d'arborescence** (`contexts/`, `hooks/`, `services/`, `pages/`) est bien organisée.

5. **Le double état local/count dans `Dish`** (`Menu.jsx`) — l'idée de synchroniser un compteur visuel local avec le contexte global est correcte en principe, même si l'implémentation a la boucle infinie mentionnée ci-dessus.

---

## Plan de Recommandations (par priorité)

| #  | Action                                                                   | Impact          |
|----|--------------------------------------------------------------------------|-----------------|
| 1  | Corriger `removeFromCart` — ajouter garde null                           | Bug crash       |
| 2  | Supprimer `count` des dépendances du useEffect dans `Menu.jsx`           | Boucle infinie  |
| 3  | Supprimer l'appel API `GET /dishes` dans le useEffect de `Cart.jsx`      | Performance     |
| 4  | Rendre `handleCartItems` synchronique                                     | Code quality    |
| 5  | Supprimer `setCart` des valeurs exposées par le Provider                 | Sécurité archi  |
| 6  | Fusionner les deux `useContext(CartContext)` en un seul dans `Dish`       | Code quality    |
| 7  | Ajouter `clearCart`, `setQuantity`, `getItemQuantity`, `getTotalItems`    | Complétude API  |
| 8  | Ajouter la persistance `localStorage`                                     | UX              |
| 9  | Connecter les boutons +/- de la page Cart au contexte                    | Fonctionnalité  |
| 10 | Connecter Checkout/Payment au CartContext au lieu des valeurs hardcodées | Fonctionnalité  |
| 11 | Supprimer `useCart.js` (code mort)                                        | Cleanup         |
| 12 | Remplacer `structuredClone` par des spreads ciblés                       | Performance     |
| 13 | Ajouter un badge compteur sur l'icône panier dans la Navbar              | UX              |
