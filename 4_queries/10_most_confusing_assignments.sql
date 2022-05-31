SELECT assignments.id AS id, assignments.name AS name, assignments.day AS day, assignments.chapter AS chapter, COUNT(assignment_id) AS total_requests FROM assistance_requests
JOIN assignments ON assignments.id = assistance_requests.assignment_id 
GROUP BY assignments.id
ORDER BY total_requests DESC;