const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.SMSAPIKEY,
  apiSecret: process.env.SMSAPISECRET
})

const from = "WomenSafety"
const to = "27738285578"

module.exports.sendSMS=async(googleUrl,victimName)=> {
    const text = `WomenSafety.\n Hi someone close to you (${String(victimName)}) appears to be in danger. Click the link to located them: - ${String(googleUrl)}.\n\n.`;
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

module.exports.sendSMSFalseAlarm=async(victimName,date_Time)=> {
  const text = `WomenSafety.\n (${String(victimName)}) has reported the recent alert as false alarm.\nThis event may have occured around ${date_Time}\n\nYou are advised to ignore it.\n\n.`;
  await vonage.sms.send({to, from, text})
      .then(resp => { console.log('Message sent successfully'); console.log(resp); })
      .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}
