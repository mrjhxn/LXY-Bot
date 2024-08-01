module.exports.config = {
    name: "fortunetellinglove",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "CatalizCS",
    description: "Fortune telling love, career, life",
    commandCategory: "Bói Toán",
    cooldowns: 5
};

module.exports.run = function ({ api, event }) {
    const data = ["You drew card 2 ♥ Let me see... Uhmm, a very good card. It signals that you will be supported and helped by a lover or a loved one. So rest assured, yes, yes. In any difficulty, he will sympathize and help you.",

        "You drew a 2 ♦ Let me see...Hmm, this piece has a lot of meaning. It could be a harbinger of business partners, or a change in relationship. I think you should talk to friends and co-workers to better understand what's going on.",

        "You drew a 2 ♣ Let me see... Hmm, this card signals an obstacle. You'll have some trouble before you succeed, and have to watch out for someone spreading bad rumors. I think you have to be more discreet, do everything carefully and thoughtfully.",

        "I drew card 2 ♠ Let me see...Tsk.... This piece is for lies, broken relationships. In the near future you may have to pause an important thing, an important relationship. It can make you sad but it is necessary. If you are wondering about a love relationship, then this piece is a sign that you are about to break up or that person is disappointing you. arrange to rest and relax for a while, then you'll be fine.",

        "You draw a 3 ♥ Let me see... Well, this piece, it's difficult. It often signals a love triangle. You will find it difficult to choose your true love. Love is not forced. You can't force it, so just relax and let what happens will happen.",

        "You draw a 3 ♦ Let me see... Well... This piece is related to the law. This time, you must be careful, avoid quarrels and conflicts. If you behave skillfully, If you know first, then I think it won't be a problem..",

        "You drew 3 ♣ Let me see...Oh, a card that signals love and happiness. If you want to propose to someone, now is the right time. In addition, it also means that so if something didn't work before, and you want to try again, go ahead.",

        "You drew a 3 ♠ Let me see...Uhmm, this card is not good, it represents a broken relationship. I think someone might be trying to interfere in your relationship. In This time, you should be careful, avoid collisions or quarrels that will break your feelings.",

        "You drew card 4 ♥ Let me see... Hmmm, this card signals a change in work and home. Maybe in the near future you will have a job transfer or a house move. I think You should just plan ahead or it will hit again..",

        "You drew a 4 ♦ Let me see... Well, it's a good card, it's a harbinger of your financial fortune. According to my calculations, I think I'll win if I like any business. In addition, you will receive good advice from an elderly person. If you listen carefully, it will be very beneficial.",

        "You draw a 4 ♣ Let me see...This is a warning card. According to my calculations, this time you have to be careful not to have a cheater or a traitor. Read it again, don't be subjective. Wish you luck!",

        "You drew a card 4 ♠ Let me see...Son, this piece is often associated with troubles and troubles. I think you should be careful in spending, even in case of loss. In general, There's nothing too dangerous, don't worry, don't worry too much, in a few days, everything will be in place."

        "You drew 5 ♥ Let me see... Hmmm, this card tells you that someone is jealous of you. That's right, a cute person never has a jealous child. I think it's you. Just be careful, it won't hurt."

        "You drew a card 5 ♦ Let me see...Ah, the card signals success and happiness, my son. According to me, you will have some changes in the near future for good. I think this is the time. very suitable for having a baby or working on a new project.",

        "I drew a card 5 ♣ Let me see...This piece is a good omen. In the future you will have many new friends, many helpers, many kind friends. I think you should spend a lot of time. make friends, expand relationships and strengthen old friendships. That will make you happy and comfortable.",

        "I drew a 5 ♠ Let me see...Ah, this one is also quite good. In my opinion, I'm a bit pessimistic about the situation. It's there, the difficulty is only temporary. Just be optimistic and have a good life!",

        "I drew a 6 ♥ Let me see... Oh my, this card is a sign of good luck. This luck follows luck. Someone wants to take care of you. Someone loves you. You'll see. warm and full of happiness. Every sin is that you should not gamble at this time, red love is black and silver.",

        "You drew a card 6 ♦ Let me see...Uhmm... this piece, harbinger of trouble, quarrel, separation. At this time, love affairs are prone to conflict, so I think it's you Just stay calm and calm. Whatever happens, don't get angry and damage your health and beauty.",

        "I drew a 6 ♣ Let me see... Hmm, this card tells me that I'm going to have financial success. I think you're going to be given money, sponsorship or financial help by someone. Let's work and study hard!",

        "You drew a 6 ♠ Let me see...Uhmm... I think you'll have some small positive changes in the near future. But it's not a big deal. I think everything will be fine in the future. calm and peaceful, you can rest assured!",

        "I drew a 7 ♥ Let me see... Well, this card represents someone who is unfaithful, has a change of heart. Maybe in the near future you will feel a little bit *disappointed*, missing someone. I don't get much in return... But it's okay, applying the ointment will heal, I think it will pass quickly. then the sensibility will also be more certain...",

        "You drew a 7 ♦ Let me see…Tsk tsk…. This piece foretells that you will soon have an argument about money or work. I think you should prepare yourself mentally for both of you. reason a little. Usually this will be fine, my dear, don't worry too much.",

        "You drew card 7 ♣ Let me see... Well, this piece signals good business and study. I think that soon you will be promoted or raise your salary. However, you have may have some minor problems with the opposite sex.",

        "I drew a 7 ♠ Let me see... Well, let me think... This seven of spas is a harbinger that you're going to have some trouble. Maybe you don't listen to other people's advice. lost opportunities. Difficulties happen only because of you. So I think that just being careful and listening will be fine.",

        "You drew an 8 ♥ Let me see...Hehe, this card tells you that you are going to receive a gift or go out. Cheer up, I think you should buy clothes, decorate your hair, I'm about to go play."

        "You drew an 8 ♦ Let me see...Uhmm... This piece is a harbinger of change in work. Maybe you will find a new job, or your current job situation will change. If you travel or work during this time, you will most likely find someone of the opposite sex attractive. Overall I think you will see some small and pleasant changes.",

        "You drew an 8 ♣ Let me see...Well, this piece is not good. You have to be careful there are haters at work. Your work may not be very good, but don't. I'm so worried because as long as I'm awake, I'll be fine."

        "I drew an 8 ♠ Let me see...Tch, eight spades, let me think... This one means greed, bad luck, danger, sadness. If you're thinking about something. then you should also remember that you have to be more careful. I think that if there is any obstacle, it will pass, as long as you think carefully and accept the difficulties.",

        "You drew a 9 ♥ Let me see... The card of dreams, wishes, and hopes. Meeting a 9 is a harbinger of dreams come true. I have calculated it, you just have to try. If you do your best, everything will be achieved. A painful wish in your heart. Just go ahead and have nothing to fear.",

        "I drew card 9 ♦ Let me see...Let me see... This piece is an omen that I will have a new business, maybe I will have to go on a business trip away from home. You will be quite busy at this time. , is always on the move and may have to move for a while.",

        "You drew a 9 ♣ Let me see... Uhmm, this card is a harbinger of success. If you are not married, I think it is very likely that you are going to marry the son of a rich family, if not, my lover I'm going to win a big lottery too. Besides, it also tells me that I'm going to meet a gift from heaven, where does money come from?",

        "You drew a 9 ♠ Let me see...Uhmm, nine of spades is not a very good card. This time can be said that your destiny is coming, so I advise you to keep it. take care of your health, be careful of the road, don't spend a lot of money. Then in a few days the bad omens will subside, then you will be carefree again. I wish you more luck."

        "You drew a card of 10 ♥ Let me see... Well, this card represents luck and success. If you meet a 10, then the tribulation will be over, wind three is a mosquito. If As soon as you face any difficulties, you can rest assured that you will be fine. Business, study, fame and career will progress. hard, Go beyond a moment to become a tycoon.",

        "I drew 10 ♦ Let me see...Ah, here's a good card. Ches traditionally symbolize money and fame, a ten usually indicates good news. Seeing this piece, I think you're going to have a change. When it comes to money, it's usually a good thing. According to the teacher, the money has already arrived. Remember to work hard and calculate your spending a bit, the opportunity is coming.",

        "You draw 10 ♣ Let me see... Good card, my son. A sign of good luck and success. If you travel or do business away from home now, it is very likely that you will meet new friends, If you don't have a lover, you may find one."

        "You drew 10 ♠ Let me see... Well, you're not doing very well with these ten spades. You have concerns, maybe you will receive not very good news. I think this time you should rest, relax, don't worry, you'll be fine.",

        "You can draw an A ♥ Let me see...This piece is a good omen of love. It is originally a symbol of a new family and a love letter. If you catch this piece, you will have trouble later. All troubles will disappear, good news will come to you. If no one loves, see that person the next afternoon. If love is melancholy, good luck will fall on your head right away.",

        "You drew an A ♦ Let me see... Well, this piece usually brings good news. It symbolizes change, a good message, usually about money. If you calculate it, maybe you will soon You'll get a raise. Just try to study and work hard, and you'll get good news soon.",

        "I drew the A card ♣ Let me see...Wow, this one is very lucky. I think you should play the lottery. It signals wealth, nobility, any wealth earned. But we have to remember, what comes quickly can also go quickly, you have to know how to spend it carefully.",

        "I drew an A card ♠ Let me see... Well, this piece is very unlucky. At this time, you have to watch out for health problems for yourself, your family and your loved ones. Business, study You should also be careful. In general, you shouldn't go far. You need to pay attention at all times, from the time you walk to the time you go to bed.",

        "You drew J ♥ Let me see...The card has the image of a good friend, sometimes referring to a young admirer. Seeing this card, I think you are about to meet someone with a very good personality. ho, funny and friendly. This person seems to like you. If you are a woman looking for a boyfriend, this could be a good opportunity. If you are a man, you are about to meet a playable friend. Young admirer, Bringing a rose and a heart, Meeting you one day without waiting, A soulmate and possibly love.",

        "I drew a J card ♦ Let me see...Let me see... J Ro, a neat young man but can also be an untrustworthy jealous person. I think you'll have someone tell you soon. The news isn't good, but it's nothing of great importance. You should be sober when listening to others at this time.",

        "I drew a J card ♣ Let me see...Jip, a friend of the same age who is shocked but cheerful and kind. I think you will have a chance to go out and have fun, if you don't have a lover This is also a good opportunity.

        "You drew a J card ♠ Let me see...The card bears the image of a jealous and hostile enemy. I think this time you should be more vigilant in matters of money as well as love, be on guard. jealous, hostile petty people.",

        "I drew the card K ♥ Let me see... Ah, this piece has the image of a kind, chivalrous, wise, understanding old man. Seeing this card is a good omen that you have a precious person to support and help you. help you even when you don't need to wait ",

        "I drew a K card ♦ Let me see...Uhmm, let's see.... This piece has the image of a man who dominates the power of the Earth, a man full of power, position and influence. Drawable. With this card, you will soon have good news, usually get a promotion. At this time, you should be nice to the above bosses as well as colleagues, there will be many opportunities.",

        "You draw a K card ♣ Let me see...Oh, this piece has a picture of a kind, generous, enthusiastic old man. You will get help from your superiors, teachers, parents or relatives. I think you may be about to get a new job with a higher salary, a promotion or someone else to give you money.",

        "I drew a K card ♠ Let me see...Uhm, let's see.... This card represents someone who is rich in ambition and can be selfish. It is a harbinger for you to watch out for people who are petty. People should avoid jealousy and jostling. You should yield to small matters, but don't let anyone touch your rights.",

        "You drew a Q ♥ Let me see...This piece has the image of a gentle, kind woman. I think you are about to receive good advice from a warm and loving woman. Sometimes this card refers to the model of a mother, sister or female soulmate. Meeting a kind woman, listening to her words will make you happy. If you are having bad luck, there the woman turns bad luck P/s: Listen to me say this, if you want to see someone, you have to first saw someone's mother, sister, younger sister or close girlfriend, listen, it will be profitable enough That's the way, son."

        "You drew a Q card ♦ Let me see... Well, this piece has a picture of a woman who rules the power of the Earth, which means that something is happening. Rumors are often false, But I also have to say that there is smoke when there is fire. I think you should talk more with friends and colleagues and know what people are talking about, it will be beneficial for you.",

        "You drew a Q card ♣ Let me see...Oh, this card has a picture of a kind, enthusiastic and open woman. You will get help from a woman. I think it could be you. will receive a useful advice from that person, remember to listen to me.",

        "I drew a Q card ♠ Let me see...The card represents a black widow. A dangerous card. You must avoid the love trap and be on the lookout for those who interrupt. In love affairs, it is necessary to soft but sober. In work, you must be wise not to decide according to your own feelings.",

        "You drew a JOKER. Let me see...Pan teh. A card of fate. It is neither a bad omen nor a good omen. The meaning of it is what will happen, if you look forward to it. It's not bad for something. I think you should just let things happen, don't force them."
    ];
    return api.sendMessage(`${data[Math.floor(Math.random() * data.length)]}`, event.threadID, event.messageID);
}