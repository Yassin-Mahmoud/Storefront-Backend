# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index : [get] '/products'
- Show : [get] '/products/:id'
- Create : [post] '/products/createproduct' [token required]
- Delete : [delete] '/products/:id/delete' [token required]

#### Users

- Index : [get] '/users' [token required]
- Show : [get] '/users/:id/account' [token required]
- Create : [post] '/users/register' [token required]
- Delete : [delete] '/users/:userId/delete [token required]
- Authentication : [post] '/users/authentication'
- Add product to order : [post] '/users/:userId/addproduct' [token required]

#### Orders

- Active Order by user (args: user id) : [get] '/orders/active/user/:userId' [token required]
- Completed Orders by user (args: user id) : [get] '/orders/completed/user/:userId' [token required]
- Update 'active' status (args: user id) : [put] '/orders/user/:userId/ordercompleted' [token required]

## Data Shapes

#### Product

- id : [ VARCHAR(50) DEFAULT uuid_generate_v4() PRIMARY KEY ]
- name : [ VARCHAR(150) NOT NULL, ]
- price : [ FLOAT NOT NULL ]

#### User

- id : [ VARCHAR(50) DEFAULT uuid_generate_v4() PRIMARY KEY ]
- firstName : [ VARCHAR(50) NOT NULL ]
- lastName : [ VARCHAR(50) NOT NULL ]
- userName : [ VARCHAR(50) NOT NULL UNIQUE ]
- password : [ VARCHAR(100) NOT NULL ]

#### Orders

- id : [ VARCHAR(50) DEFAULT uuid_generate_v4() PRIMARY KEY ]
- user_id [ VARCHAR(50) NOT NULL ]
- status of order (active or complete) [ orderStatus NOT NULL ] [ ENUM ('completed', 'active') ]
  [ FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE ]

#### Order products

- id : [ VARCHAR(50) DEFAULT uuid_generate_v4() PRIMARY KEY ]
- orderId : [ VARCHAR(50) NOT NULL ]
- productId : [ VARCHAR(50) NOT NULL ]
- quantity : [ INTEGER DEFAULT (1) ]
- [ FOREIGN KEY(orderId) REFERENCES orders(id) ON DELETE CASCADE ]
- [ FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE ]
