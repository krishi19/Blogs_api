// export default `
//     SELECT c.id,
//     c.title, 
//     c.description, 
//     c.created_at,
//     STRING_AGG(ci.image_url, ',') AS images
//     FROM blogs c
//     LEFT JOIN blogImages ci ON ci.blog_id = ci.id
//     GROUP BY c.id, c.title, c.description, c.created_at ;
// `;


// export default `
// Select * from blogs;
// `;

export default `
    SELECT c.id,
    c.title, 
    c.description, 
    c.created_at,
    STRING_AGG(ci.image_url, ',') AS images
    FROM blogs c
    LEFT JOIN blogImages ci ON ci.blog_id = ci.id
    GROUP BY c.id, c.title, c.description, c.created_at ;
`;