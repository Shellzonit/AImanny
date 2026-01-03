import resend

# Set your Resend API key here or load from environment variable for security
resend.api_key = "re_xxxxxxxxx"  # Replace with your real API key or use os.environ.get('RESEND_API_KEY')

def send_email(to: str, subject: str, html: str, sender: str = "Acme <onboarding@resend.dev>"):
    params = {
        "from": sender,
        "to": [to],
        "subject": subject,
        "html": html
    }
    return resend.Emails.send(params)
