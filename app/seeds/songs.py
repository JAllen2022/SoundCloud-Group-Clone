from app.models import db, Song, environment, SCHEMA
from .users import demo, roysa, ryan, jason, lillyann

def seed_songs():
    demo_song = Song(user_id=1, title="Roysa is Lame", artist="Leandro's mom", genre="Dubstep", description="This song is about how lame Roysa is because she is so lame", length=4.47, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Doja+Cat+-+MOOO!.mp3", song_image_url="https://images.complex.com/complex/images/c_fill,f_auto,g_center,w_1200/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi", song_likes=[roysa])

    roysas_song = Song(user_id=2, title="Poopy Ryan", artist="Potato", genre="Trance", description="Ryan's song about a poopy potato salad", length=3.32, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/12_Love_Yourz___HiphopKit.com.mp3", song_image_url="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/master/pass/Artist-Designed%20Album%20Covers%202.jpg", song_likes=[jason, lillyann, demo])

    jasons_song = Song(user_id=3,title="Your mom", artist="Your grandma", genre="Trap", description="Yo mama", length=3.59, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/R%C3%9CF%C3%9CS+DU+SOL+-+You+Were+Right.mp3",song_image_url="https://cdn.shopify.com/s/files/1/0065/3069/5257/products/webMODYL12121589_2000x.jpg?v=1626183421", song_likes=[roysa,lillyann,jason,demo,ryan])

    ryans_song = Song(user_id=4, title="Roysa Sucks", artist="Leandro's Soup", genre="Dubstep", description="A song about how Roysa sucks so much that there needs to be a song about it", length=3.54, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Darude+-+Sandstorm.mp3", song_image_url="https://admin.itsnicethat.com/images/ESgAg6Y2f2xM_pfPIsyL0pvdQHg=/69898/format-webp%7Cwidth-2880/598196e77fa44cb08200a23e.jpg", song_likes=[jason, demo, lillyann])

    lillyanns_song = Song(user_id=3,title="Kill Bill", artist="SZA", genre="Trap", description="Yo mama", length=4.36, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/SZA_-_Kill_Bill_Official_Video.mp3",song_image_url="https://i1.sndcdn.com/artworks-y7Tyi9W7mwWNHxMi-uU9FyA-t500x500.jpg", song_likes=[jason, roysa])

    db.session.add(demo_song)
    db.session.add(roysas_song)
    db.session.add(jasons_song)
    db.session.add(ryans_song)
    db.session.add(lillyanns_song)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")

    db.session.commit()
