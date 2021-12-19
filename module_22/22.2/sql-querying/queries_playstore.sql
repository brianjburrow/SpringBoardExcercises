
SELECT * FROM analytics;

-- Find the app with an ID of 1880.
SELECT * FROM analytics 
WHERE id = 1880;

-- Find the ID and app name for all apps that were last updated on August 01, 2018.
SELECT id, app_name, last_updated FROM analytics WHERE last_updated > '20180801';

-- Count the number of apps in each category, e.g. “Family | 1972”.
SELECT category, count(id) FROM analytics group by category;

-- Find the top 5 most-reviewed apps and the number of reviews for each.
select app_name, reviews from analytics order by reviews desc limit 5;

-- Find the app that has the most reviews with a rating greater than equal to 4.8.
select app_name from analytics
where reviews = (select max(reviews) from analytics where rating >= 4.8);

-- Find the average rating for each category ordered by the highest rated to lowest rated.
select category, AVG(rating) avg_rating from analytics group by category order by avg_rating desc;

-- Find the name, price, and rating of the most expensive app with a rating that’s less than 3.
select app_name, price, rating from analytics where price = (select max(price) from analytics where rating < 3);

-- Find all apps with a min install not exceeding 50, that have a rating. Order your results by highest rated first.
select app_name from analytics where min_installs <= 50 and rating > 0 order by rating desc;
-- Find the names of all apps that are rated less than 3 with at least 10000 reviews.
select app_name from analytics where rating < 3 and reviews >= 10000;
-- Find the top 10 most-reviewed apps that cost between 10 cents and a dollar.
select app_name, rating, price from analytics where price between 0.1 and 1 order by reviews desc limit 10;
-- Find the most out of date app. Hint: You don’t need to do it this way, but it’s possible to do with a subquery: http://www.postgresqltutorial.com/postgresql-max-function/
select app_name from analytics where last_updated = (select min(last_updated) from analytics);
-- Find the most expensive app (the query is very similar to #11).
select app_name, price from analytics where price = (select max(price) from analytics);
-- Count all the reviews in the Google Play Store.
select sum(reviews) from analytics;
-- Find all the categories that have more than 300 apps in them.
select category, count(id) as num_apps 
from analytics 
group by category 
having count(id) > 300;
-- Find the app that has the highest proportion of min_installs to reviews, 
-- among apps that have been installed at least 100,000 times. 
-- Display the name of the app along with the number of reviews, the min_installs, and the proportion.

select app_name, reviews, min_installs, min_installs/reviews as ratio
from analytics  where min_installs/reviews = (select max(min_installs/reviews) from analytics where min_installs > 100000);




SELECT app_name FROM analytics 
  WHERE min_installs <= 50 
    AND rating IS NOT NULL 
  ORDER BY rating DESC;
