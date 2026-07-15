const Contact = () => {
    return (
        <div className="page-container contact-page">
            <div className="contact-header">
                <h1>Get in Touch</h1>
                <p>We'd love to hear from you. Our team is always here to chat.</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-card"> 
                        <div className="info-icon">📍</div>
                        <h3>Visit Us</h3>
                        <p>Chakala Industrial Area (MIDC), Andheri East, Mumbai</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">📞</div>
                        <h3>Call Us</h3>
                        <p>+91 7302987921</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">✉️</div>
                        <h3>Email Us</h3>
                        <p>ranaavinish72@gmail.com</p>
                    </div>
                </div>

                <form className="contact-form-premium">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input id="fullName" type="text" placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" placeholder="john@example.com" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input id="subject" type="text" placeholder="Order Inquiry" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" placeholder="How can we help you?" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="submit-btn" onClick={(e) => e.preventDefault()}>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
