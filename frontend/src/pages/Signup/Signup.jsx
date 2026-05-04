import Button from '../../components/Button/Button';
import "./Signup.css";


function Signup() {
  return (
    <form className="py-6 max-w-118.75 m-auto my-16 bg-neutral-950 rounded-default grid">
      <div className='px-6 pb-6 border-b border-neutral-800 flex items-center justify-between'>
        <h1 className='text-xl text-secondary-100 font-bold'>Sign Up</h1>
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m17.705 7.705l-1.41-1.41L12 10.59L7.705 6.295l-1.41 1.41L10.59 12l-4.295 4.295l1.41 1.41L12 13.41l4.295 4.295l1.41-1.41L13.41 12z"/></svg>
        </a>
      </div>

      <fieldset className='px-6 py-6 border-b border-neutral-800 grid gap-6'>
        <legend className="hidden" aria-hidden={true}>credentials</legend>

        <div className='input-field'>
          <label htmlFor="name">Your name</label>
          <input type="text" name="username" id="name" placeholder='John Doe' />
        </div>
        <div className='input-field'>
          <label htmlFor="email">Your email</label>
          <input type="email" name="email" id="email" placeholder='john@example.com' />
        </div>
        <div className='input-field'>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder='......' />
        </div>
        <Button className={"w-full btn-primary inline-flex justify-center rounded-sm"}>Create account</Button>

        <div className='flex gap-2 items-center text-sm text-secondary-500'>
          <input type="checkbox" name="privacy check" id="privacy" />
          <label htmlFor="privacy">By continuing, I agree to the terms of use & privacy policy.</label>
        </div>
      </fieldset>

      <div className='px-6 pt-6 inline-flex justify-center items-center gap-2 text-sm text-secondary-500'>
        Already have an account ? <a className='text-primary-600' href="/login">Login here</a>
      </div>
    </form>
  )
}

export default Signup