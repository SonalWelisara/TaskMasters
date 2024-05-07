package org.example.springbootbackend.services;


import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioSmsService {

    @Value("AC14e050c0cbeec138153c05baaa5f88d8")
    private String accountSid;

    @Value("ba836a8d239b2325d13313cb6e377bc1")
    private String authToken;

    @Value("+19382016953")
    private String fromPhoneNumber;

    public void sendSms(String toPhoneNumber, String messageBody) {
        Twilio.init(accountSid, authToken);

        Message message = Message.creator(
                        new PhoneNumber(toPhoneNumber), // To phone number
                        new PhoneNumber(fromPhoneNumber), // From Twilio phone number
                        messageBody)
                .create();

        System.out.println("SMS sent successfully. SID: " + message.getSid());
    }
}
