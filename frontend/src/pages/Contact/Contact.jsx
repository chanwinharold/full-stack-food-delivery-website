import { assets } from "../../assets/assets";
import "./Contact.css";
import Button from '../../components/Button/Button';


function Contact() {
	return (
		<main className="grid grid-cols-2 gap-8 px-8 py-16 place-items-center">
			<Infos />
			<Form />
		</main>
	);
}

export default Contact;

const Infos = () => {
	return (
		<section className="grid gap-12">
			<header className="grid gap-2">
				<h1 className="text-4xl font-semibold">Get in Touch</h1>
				<p className="text-sm text-neutral-200 max-w-120">
					We'd love to hear from you. Whether you have a question
					about our menu, delivery, or anything else, our team is
					ready to answer all your questions.
				</p>
			</header>

			<div className="grid gap-8">
				<article className="info-container">
					<span>
						<img src={assets.icon_visit_us} alt="" />
					</span>
					<div>
						<strong>Visit Us</strong>
						<span>
							123 Culinary Boulevard <br />
							Food District, FD 10024
						</span>
					</div>
				</article>
				<article className="info-container">
					<span>
						<img src={assets.icon_call_us} alt="" />
					</span>
					<div>
						<strong>Call Us</strong>
						<span>
							+1 (555) 123-4567 <br />
							Mon-Fri from 8am to 5pm.
						</span>
					</div>
				</article>
				<article className="info-container">
					<span>
						<img src={assets.icon_email_us} alt="" />
					</span>
					<div>
						<strong>Email Us</strong>
						<span>
							hello@tomato.com <br />
							We'll respond within 24 hours.
						</span>
					</div>
				</article>

			</div>

			<footer className="grid gap-4">
				<strong className="uppercase">follow us</strong>
				<div className="flex gap-4">
					<span className="icon-wrapper"><img src={assets.icon_camera} alt="" /></span>
					<span className="icon-wrapper"><img src={assets.icon_bird} alt="" /></span>
					<span className="icon-wrapper"><img src={assets.icon_play} alt="" /></span>
				</div>
			</footer>
		</section>
	);
};

const Form = () => {
	return (
		<form className="form-container relative overflow-hidden">
			<div className="bg-circle"></div>

			<h2 className="text-[24px] font-medium">Send a Message</h2>
			<div className="grid gap-6">
				<fieldset className="grid grid-cols-2 gap-6">
					<legend className="hidden" aria-hidden="true">
						User Infos
					</legend>
					<label className="form-field" htmlFor="name">
						<span>First name</span>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="John Doe"
						/>
					</label>
					<label className="form-field" htmlFor="email">
						<span>Email</span>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="john@example.com"
						/>
					</label>
				</fieldset>
				<fieldset className="grid gap-6">
					<legend className="hidden" aria-hidden="true">
						User message
					</legend>
					<label className="form-field" htmlFor="subject">
						<span>Subject</span>
						<input
							type="text"
							name="subject"
							id="subject"
							placeholder="How can we help?"
						/>
					</label>
					<label className="form-field" htmlFor="message">
						<span>Message</span>
						<textarea
							className="h-30 py-2"
							name="message"
							id="message"
							placeholder="Tell us more about your inquiry..."
						/>
					</label>
				</fieldset>

				<Button className={"btn-primary w-full rounded-full h-12 inline-grid place-content-center font-bold bg-primary-400 border-primary-400 shadow-xl hover:shadow-primary-400 hover:bg-primary-600 hover:border-primary-600"} type="submit">Send Message</Button>
			</div>
		</form>
	);
};
