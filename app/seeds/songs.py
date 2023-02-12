from app.models import db, Song, environment, SCHEMA
from .users import demo, roysa, ryan, jason, lillyann

def seed_songs():
    demo_song = Song(user_id=1, title="Roysa is Lame", artist="Leandro's mom", genre="Dubstep", description="This song is about how lame Roysa is because she is so lame", length=3.30, song_url="roysapoopoo.com", song_image_url="roysaislame.com", song_likes=[roysa])

    roysas_song = Song(user_id=2, title="Poopy Ryan", artist="Potato", genre="Trance", description="Ryan's song about a poopy potato salad", length=3.50, song_url="ryan-sucks.url", song_image_url="poop-image.url", song_likes=[jason, lillyann, demo])

    jasons_song = Song(user_id=3,title="Your mom", artist="Your grandma", genre="Trap", description="Yo mama", length=3.69, song_url="song.url",song_image_url="what_is_going_on.com", song_likes=[roysa,lillyann,jason,demo,ryan])

    ryans_song = Song(user_id=4, title="Roysa Sucks", artist="Leandro's Soup", genre="Dubstep", description="A song about how Roysa sucks so much that there needs to be a song about it", length=3.20, song_url="ihateroysa.com", song_image_url="roysasucks.com", song_likes=[jason, demo, lillyann])

    lillyanns_song = Song(user_id=3,title="Kill Bill", artist="SZA", genre="Trap", description="Yo mama", length=3.69, song_url="song.url",song_image_url="what_is_going_on.com", song_likes=[jason, roysa])

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