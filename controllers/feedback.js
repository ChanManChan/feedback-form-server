const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailFeedback = (req, res) => {
  const { name, email, description, phone, uploadedFiles } = req.body;
  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: 'Feedback form',
    html: `
    <div style="box-sizing:border-box;background-color:#e8eaf6;">
      <h1>Customer Feedback Form</h1>
      <hr/>
      <h2>Client name: ${name}</h2>
      <h2>Client email: ${email}</h2>
      <h2>Client description: ${description}</h2>
      <h2>Client contact number: ${phone}</h2>
      <br/>
      <div style="border:2px solid #00695c">
       ${uploadedFiles.map((f) => {
         return `<img src=${f.secure_url} alt=${f.original_filename} style="width:47%;overflow:hidden;padding:20px;border:2px solid #eee"/>`;
       })}
      </div>
      <hr/>
      <p>${process.env.EMAIL_FROM}</p> 
  </div>
    `,
  };
  sgMail
    .send(emailData)
    .then((sent) => {
      console.log('EMAIL SENT: ', sent);
      return res.json({
        success: true,
        message: 'Email was sent successfully',
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        message: 'Email was not sent to admin. Try again.',
      });
    });
};
