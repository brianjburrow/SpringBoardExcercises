SELECT *
FROM owners 
FULL JOIN vehicles
ON owners.id = owner_id;


select first_name, last_name, sq.count
FROM owners JOIN (select owner_id, COUNT(*) as count
FROM owners 
FULL JOIN vehicles
ON owners.id = owner_id
GROUP BY owner_id) sq
ON owners.id=sq.owner_id
order by first_name;

select first_name, last_name, sq.num, ROUND(sq.avgprice)
FROM owners JOIN (select owner_id, COUNT(*) as num,
AVG(price) as avgprice
FROM owners 
FULL JOIN vehicles
ON owners.id = owner_id
GROUP BY owner_id
HAVING COUNT(*) > 1) sq
ON owners.id=sq.owner_id
where ROUND(sq.avgprice) > 10000
order by first_name DESC;
