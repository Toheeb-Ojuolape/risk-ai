def forgot_password_email(name: str, verification_link: str) -> str:
    content = f"""
    <html>
        <body style="height:100vh;font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
            <div style="max-width: 500px; margin: 36px auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                 <h3 style="margin:36px auto; text-align: center"> Risk AI</h3>
                <h2 style="color: #333;">Hello {name},</h2>
                <p style="color: #555; line-height: 1.6;">
                    We have received your request to change your password. Kindly tap the link below to reset your password on RiskAI
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="{verification_link}" 
                       style="background-color: #0b331b; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 4px; display: inline-block;">
                       Verify Email
                    </a>
                </div>
                <p style="text-align:center; color: #555; line-height: 1.6;">
                    If you did not request this verification, please ignore this email.
                </p>
                <p style="color: #777; font-size: 12px; text-align: center; margin-top: 20px;">
                    &copy; {2025} RiskAI. All rights reserved.
                </p>
            </div>
        </body>
    </html>
    """
    return content
