CREATE OR REPLACE FUNCTION getscore(n INTEGER)
RETURNS VOID AS $$
DECLARE
    rec RECORD;
    v_id int;
    v_score1 int;
    v_score2 int;
    v_score3 int;
    v_score4 int;
    v_score5 int;
    v_score6 int;
    v_score7 int;
    v_score8 int;
    v_score9 int;
    v_score10 int;
    v_bff_id int;
BEGIN
v_id := n;
v_score1 := (select score1 from friend where id = n);
v_score2 := (select score2 from friend where id = n);
v_score3 := (select score3 from friend where id = n);
v_score4 := (select score4 from friend where id = n);
v_score5 := (select score5 from friend where id = n);
v_score6 := (select score6 from friend where id = n);
v_score7 := (select score7 from friend where id = n);
v_score8 := (select score8 from friend where id = n);
v_score9 := (select score9 from friend where id = n);
v_score10 := (select score10 from friend where id = n);

drop table if exists temp_calc_score;
create table temp_calc_score (
  id int, score1 int, score2 int, score3 int, score4 int, score5 int
  ,score6 int, score7 int, score8 int, score9 int, score10 int, score int);

    FOR rec IN
        SELECT
          id
          ,abs(score1 - v_score1) as score1
          ,abs(score2 - v_score2) as score2
          ,abs(score3 - v_score3) as score3
          ,abs(score4 - v_score4) as score4
          ,abs(score5 - v_score5) as score5
          ,abs(score6 - v_score6) as score6
          ,abs(score7 - v_score7) as score7
          ,abs(score8 - v_score8) as score8
          ,abs(score9 - v_score9) as score9
          ,abs(score10 - v_score10) as score10
          ,abs(score1 - v_score1) +
          abs(score2 - v_score2) +
          abs(score3 - v_score3) +
          abs(score4 - v_score4) +
          abs(score5 - v_score5) +
          abs(score6 - v_score6) +
          abs(score7 - v_score7) +
          abs(score8 - v_score8) +
          abs(score9 - v_score9) +
          abs(score10 - v_score10) as score
        FROM friend
        WHERE id <>  n

    LOOP
   insert into temp_calc_score (
     id, score1, score2, score3, score4, score5, score6, score7, score8, score9, score10, score)
   values (
     rec.id, rec.score1, rec.score2, rec.score3, rec.score4, rec.score5
     ,rec.score6, rec.score7, rec.score8, rec.score9, rec.score10, rec.score);
    END LOOP;
   update friend set bff_id = (
     select id from temp_calc_score where score = (
        select min(score) from temp_calc_score limit 1) limit 1)
   where id = n;
END;
$$ LANGUAGE plpgsql;