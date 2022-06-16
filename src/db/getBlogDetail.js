export default `
SELECT c.id,
 c.title, 
 c.description 
 , c.created_at,
STRING_AGG(ci.image_url, ',') AS images
FROM blogs c
LEFT JOIN blogs_images ci ON ci.blog_id = ci.id
WHERE c.id = :blogId
GROUP BY c.id, c.title, c.id, c.description, c.created_at ;
`;