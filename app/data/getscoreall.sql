CREATE OR REPLACE FUNCTION getscoreall()
RETURNS VOID AS $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN SELECT cast(id as integer) as id FROM friend

    LOOP
    perform getscore(rec.id);
    END LOOP;
END;
$$ LANGUAGE plpgsql;