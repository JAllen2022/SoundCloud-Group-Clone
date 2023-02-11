from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    demo_comment = Comment(body="roysa roysa", user_id=1, song_id=2)
    roysas_comment = Comment(song_id=3, user_id = 2, body = "Ryan sniffs his poopy diapers")
    jasons_comment = Comment(song_id=2,user_id=3, body="Demo sniffs toes")
    ryans_comment = Comment(song_id = 5, user_id=4, body="I sniff poopy diapers")
    lillyanns_comment = Comment(song_id=1,user_id=3, body="Swagtastic song")

    db.session.add(demo_comment)
    db.session.add(roysas_comment)
    db.session.add(jasons_comment)
    db.session.add(ryans_comment)
    db.session.add(lillyanns_comment)
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
