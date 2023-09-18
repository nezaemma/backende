import nodemailer from "nodemailer";
const sendEmail =async (allUsersInfo, newsData)=>{
let transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD,

    },
});
let mailOptions = {
    from: process.env.EMAIL,
    to: allUsersInfo.email,
    subject: `${allUsersInfo.firstName} new post has been posted`,
    html: `<p>Dear, <b>${allUsersInfo.firstName} ${allUsersInfo.lastName}</b></p><br/><br/> 
    <p>new post <b>${newsData.newsMainTitle}</b> has been added</p><br/><br/>
    <p>click the link <a href="http:akazuba.com">Akazuba</a></p>`,
  };
  transporter.sendMail(mailOptions, function(err,info) {
    if(err) {
        console.err(err);
    }else {
    console.log(info);
    }
  });
};
export default sendEmail;