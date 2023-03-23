from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    comment1 = Comment(song_id = 2, user_id = 1, body = "Great song!!")
    comment2 = Comment(song_id = 3, user_id = 2, body = "Amazing :O")
    comment3 = Comment(song_id = 4, user_id = 3, body = "Fire🔥🔥")
    comment4 = Comment(song_id = 5, user_id = 4, body = "This cant be real💀")
    comment5 = Comment(song_id = 6, user_id = 5, body = "I'm a hater :P")
    comment6 = Comment(song_id = 7, user_id = 1, body = "nah")
    comment7 = Comment(song_id = 8, user_id = 2, body = "This aint it chief")
    comment8 = Comment(song_id = 9, user_id = 3, body = "OMGGGGG")
    comment9 = Comment(song_id = 10, user_id = 4, body = "NO WAY")
    comment10 = Comment(song_id = 1, user_id = 5, body = "wow👏")
    comment11 = Comment(song_id = 2, user_id = 1, body = "art")
    comment12 = Comment(song_id = 3, user_id = 2, body = "BODIED THIS")
    comment13 = Comment(song_id = 4, user_id = 3, body = "I like this🤔")
    comment14 = Comment(song_id = 5, user_id = 4, body = "They killed this!")
    comment15 = Comment(song_id = 6, user_id = 5, body = "hating")
    comment16 = Comment(song_id = 7, user_id = 1, body = "Im a potato and this is my song")
    comment17 = Comment(song_id = 7, user_id = 2, body = "Triangle goes hard!")
    comment18 = Comment(song_id = 8, user_id = 3, body = "LALALALALALLLL song is too good!")
    comment19 = Comment(song_id = 10, user_id = 4, body = "On repeat")
    comment20 = Comment(song_id = 11, user_id = 5, body = "Stuck in my head O.o")
    comment21 = Comment(song_id = 12, user_id = 1, body = "Who else liked before listening!!")
    comment22 = Comment(song_id = 1, user_id = 2, body = "Always heat🔥🔥")
    comment23 = Comment(song_id = 15, user_id = 3, body = "CALL A PLUMBER OoO")
    comment24 = Comment(song_id = 11, user_id = 4, body = "This one sucks!")
    comment25 = Comment(song_id = 1, user_id = 5, body = "Im annoyed")
    comment26 = Comment(song_id = 2, user_id = 1, body = "This song hurts my ears")
    comment27 = Comment(song_id = 3, user_id = 2, body = "Yall are crazy 💀")
    comment28 = Comment(song_id = 4, user_id = 3, body = "💀💀💀")
    comment29 = Comment(song_id = 4, user_id = 4, body = "Okay...")
    comment30 = Comment(song_id = 6, user_id = 5, body = "no")
    comment31 = Comment(song_id = 8, user_id = 1, body = "Drop another!")
    comment32 = Comment(song_id = 9, user_id = 2, body = "AHHHHHHHH")
    comment33 = Comment(song_id = 10, user_id = 3, body = "Sending to my bestieee")
    comment34 = Comment(song_id = 13, user_id = 4, body = "need work")
    comment35 = Comment(song_id = 19, user_id = 5, body = "Soooooooo talented")
    comment36 = Comment(song_id = 20, user_id = 1, body = "Im excited for more like this")
    comment37 = Comment(song_id = 20, user_id = 2, body = "Holy banana")
    comment38 = Comment(song_id = 13, user_id = 3, body = "excuse me?")
    comment39 = Comment(song_id = 15, user_id = 4, body = "gtg🔥🔥")
    comment40 = Comment(song_id = 9, user_id = 5, body = "Swagtastic song")
    comment41 = Comment(song_id = 25, user_id = 1, body = "makes me want to dance!")
    comment42 = Comment(song_id = 12, user_id = 2, body = "I'm loving the beat in this one!")
    comment43 = Comment(song_id = 31, user_id = 3, body = "giving me all the feels ❤️")
    comment44 = Comment(song_id = 17, user_id = 4, body = "This is the perfect song for a road trip 🚗🎶")
    comment45 = Comment(song_id = 33, user_id = 5, body = "Can't stop listening to this song, it's so addictive!")
    comment46 = Comment(song_id = 22, user_id = 5, body = "Love the lyrics in this one")
    comment47 = Comment(song_id = 3, user_id = 5, body = "I'm a huge fan of this artist, and this song definitely doesn't disappoint!")
    comment48 = Comment(song_id = 29, user_id = 3, body = "This song is so catchy")
    comment49 = Comment(song_id = 32, user_id = 2, body = "I'm blown away by the talent in this song, it's so beautiful ❤️")
    comment50 = Comment(song_id = 10, user_id = 1, body = "pick-me-up on a bad day 😊")
    comment51 = Comment(song_id = 4, user_id = 4, body = "I'm not usually a fan of this genre, but this song is really growing on me!")
    comment52 = Comment(song_id = 30, user_id = 4, body = "I'm listening on repeat, it's just that good!")
    comment53 = Comment(song_id = 22, user_id = 2, body = "The perfect blend of upbeat and mellow")
    comment54 = Comment(song_id = 5, user_id = 1, body = "I'm in love with the vocals, they're so powerful!")
    comment55 = Comment(song_id = 16, user_id = 5, body = "Has been on my playlist for weeks, it's that good!")
    comment56 = Comment(song_id = 33, user_id = 3, body = "I'm loving the energy, it's so hype!")
    comment57 = Comment(song_id = 7, user_id = 2, body = "PERFECT for a lazy Sunday afternoon 🌞🎶")
    comment58 = Comment(song_id = 13, user_id = 4, body = "Can't believe this song isn't more popular, it deserves way more recognition!")
    comment59 = Comment(song_id = 21, user_id = 3, body = "This song has me feeling all the emotions, it's so raw ❤️")
    comment60 = Comment(song_id = 25, user_id = 5, body = "The perfect background music for studying")
    comment61 = Comment(song_id = 9, user_id = 1, body = "This is so addictive!")
    comment62 = Comment(song_id = 23, user_id = 2, body = "I'm loving the vibe in this song, it's so chill and relaxing")
    comment63 = Comment(song_id = 18, user_id = 2, body = "This song brings back so many memories!")
    comment64 = Comment(song_id = 25, user_id = 2, body = "I love the beat in this song!")
    comment65 = Comment(song_id = 7, user_id = 1, body = "Perfect for a road trip!")
    comment66 = Comment(song_id = 27, user_id = 3, body = "This song is my new favorite!")
    comment67 = Comment(song_id = 14, user_id = 4, body = "I can't stop listening to this song!")
    comment68 = Comment(song_id = 30, user_id = 5, body = "so catchy, I can't get it out of my head!")
    comment69 = Comment(song_id = 22, user_id = 1, body = "Such a beautiful melody!")
    comment70 = Comment(song_id = 11, user_id = 2, body = "perfect workout jam!")
    comment71 = Comment(song_id = 29, user_id = 3, body = "I love the lyrics in this song!")
    comment72 = Comment(song_id = 28, user_id = 4, body = "This song is a classic")
    comment73 = Comment(song_id = 29, user_id = 3, body = "I'll never get tired of it!")
    comment74 = Comment(song_id = 31, user_id = 4, body = "they're so relatable")
    comment75 = Comment(song_id = 33, user_id = 5, body = "I'm a huge fan")
    comment76 = Comment(song_id = 21, user_id = 1, body = "I can't get it out of my head!")
    comment77 = Comment(song_id = 11, user_id = 2, body = "This song is the perfect")
    comment78 = Comment(song_id = 10, user_id = 3, body = "Another one")
    comment79 = Comment(song_id = 1, user_id = 4, body = "OUUUUUUF🔥🔥")
    comment80 = Comment(song_id = 26, user_id = 5, body = "Swagtastic")
    comment81 = Comment(song_id = 7, user_id = 2, body = "always puts me in a good mood!")
    comment82 = Comment(song_id = 26, user_id = 2, body = "so catchy!")
    comment83 = Comment(song_id = 24, user_id = 3, body = "This song gives me chills every time I hear it.")
    comment84 = Comment(song_id = 13, user_id = 3, body = "I just discovered this and I'm obsessed!")
    comment85 = Comment(song_id = 27, user_id = 3, body = "makes me want to dance around my room! ughhhh")
    comment86 = Comment(song_id = 32, user_id = 1, body = "so powerful.")
    comment87 = Comment(song_id = 11, user_id = 2, body = "I heard this on the radio and had to look it up.")
    comment88 = Comment(song_id = 32, user_id = 4, body = "I love this song")
    comment89 = Comment(song_id = 16, user_id = 4, body = "The memories :/")
    comment90 = Comment(song_id = 25, user_id = 4, body = "I can't get enough")
    comment91 = Comment(song_id = 22, user_id = 5, body = "my new jam!!")
    comment92 = Comment(song_id = 14, user_id = 5, body = "I love the beat")
    comment93 = Comment(song_id = 27, user_id = 5, body = "perfect for when you need to lift your spirits, love it!")
    comment94 = Comment(song_id = 27, user_id = 5, body = "gives me chills")
    comment95 = Comment(song_id = 22, user_id = 2, body = "catchy")
    comment96 = Comment(song_id = 31, user_id = 2, body = "💩")
    comment97 = Comment(song_id = 16, user_id = 1, body = "🥳🔥")
    comment98 = Comment(song_id = 6, user_id = 3, body = "👀👀👀")
    comment99 = Comment(song_id = 23, user_id = 3, body = "noooooooooo")
    comment100 = Comment(song_id = 32, user_id = 5, body = "wowzerz")






    db.session.add_all([
        comment1,
        comment2,
        comment3,
        comment4,
        comment5,
        comment6,
        comment7,
        comment8,
        comment9,
        comment10,
        comment11,
        comment12,
        comment13,
        comment14,
        comment15,
        comment16,
        comment17,
        comment18,
        comment19,
        comment20,
        comment21,
        comment22,
        comment23,
        comment24,
        comment25,
        comment26,
        comment27,
        comment28,
        comment29,
        comment30,
        comment31,
        comment32,
        comment33,
        comment34,
        comment35,
        comment36,
        comment37,
        comment38,
        comment39,
        comment40,
        comment41,
        comment42,
        comment43,
        comment44,
        comment45,
        comment46,
        comment47,
        comment48,
        comment49,
        comment50,
        comment51,
        comment52,
        comment53,
        comment54,
        comment55,
        comment56,
        comment57,
        comment58,
        comment59,
        comment60,
        comment61,
        comment62,
        comment63,
        comment64,
        comment65,
        comment66,
        comment67,
        comment68,
        comment69,
        comment70,
        comment71,
        comment72,
        comment73,
        comment74,
        comment75,
        comment76,
        comment77,
        comment78,
        comment79,
        comment80,
        comment81,
        comment82,
        comment83,
        comment84,
        comment85,
        comment86,
        comment87,
        comment88,
        comment89,
        comment90,
        comment90,
        comment91,
        comment92,
        comment93,
        comment94,
        comment95,
        comment96,
        comment97,
        comment98,
        comment99,
        comment100
    ])
    # db.session.add(comment)
    # db.session.add(comment)
    # db.session.add(comment)
    # db.session.add(comment)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
