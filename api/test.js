const chai = require('chai');
const server = require('./test/test')
const chaiHttp = require('chai-http');
const { head } = require('./server');
chai.should();
chai.use(chaiHttp)


// // Unit Testing of Diary End-Points.
// describe('Functional Testinng', function(){
//     describe('GET /', function(){
//         // #1 GET '/' 
//         it('Test GET / Welcome to HomePage', function(done){
//             chai
//             .request(server)
//             .get('/')
//             .end((err, res)=>{
//                 res.should.have.status(200);
//                 done();
//             })
//         })
//     })
//     // #1
//     describe('POST /auth/signup', function(){
//         it('Create new users', function(done){
//             const newUser = {
//                 firstname:'John',
//                 lastname:'Doe',
//                 username:'John.io',
//                 email:'John@gmail.com',
//                 password:'123'
//             }
//             chai
//             .request(server)
//             .post('/auth/signup')
//             .send(newUser)
//             .end((err, res) =>{
//                 res.should.have.status(201)
//                 res.body.should.be.a('object')
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('message')
//                 done()
//             })
//         })
//     })
//     // #2
//     describe('POST /auth/signin', function(){
//         it('it should log existing user in', function(done){
//             const userLogin = {
//                 username:'John.io',
//                 email:'John@gmail.com',
//                 password:'123'
//             }
//             chai
//             .request(server)
//             .post('/auth/signin')
//             .send(userLogin)
//             .end((err, res)=>{
//                 res.should.have.status(200)
//                 res.body.should.be.a('object')
//                 res.body.should.have.property('status')
//                 done()
//             })
//         })
//     })
//     // #3
//     describe('GET /api/v1/entries', function(){
//         it('it should GET all diary post', function(done){
//             chai
//             .request(server)
//             .get('/api/v1/entries')
//             .end((err, res)=>{
//                 res.should.have.status(200)
//                 res.body.should.have.a('object')
//                 res.body.should.have.property('status')
//               res.body.should.have.property('data')
//                 done()
//             })
//         })
//     })
//     //#4 Entry by {Id}
//     describe('GET /api/v1/entry/:id', function(){
//         it('it should GET post by id', function(done){
//             const id = 3
//             chai
//             .request(server)
//             .get(`/api/v1/entry/${id}`)
//             .end((err, res)=>{
//                 res.should.have.status(200)
//                 res.body.should.have.a('object')
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('data')
//                 done()
//             })
//         })
//     })
//     // #5 POST newpost
//   describe('POST /API/V1/entry/addEntries', function(){
//       it('it should add new entry post', function(done){
//           const newPost ={
//               title:"Hello World!!!",
//               description:"Introduction to programming!"
//           }
//           chai
//           .request(server)
//           .post('/api/v1/entry/addEntries')
//           .send(newPost)
//           .end((err, res) =>{
//             res.should.have.status(201)
//             res.body.should.have.a('object')
//             res.body.should.have.property('status')
//           res.body.should.have.property('data')
//               done()
//           })
//       })
//   })  
// //   #6 EDIT entries by ID
// describe('PATCH /api/v1/entry/:id', function(){
//     it('it should PATCH edit by id', function(done){
//         const id = 1
//         chai
//         .request(server)
//         .patch(`/api/v1/entry/${id}`)
//         .end((err, res)=>{
//             res.should.have.status(200)
//             res.body.should.have.a('object')
//             res.body.should.have.property('status')
//             res.body.should.have.property('data')
//             done()
//         })
//     })
// })

// // #8
// describe('DELETE /api/v1/entry/:id', function(){
//     it('it should DELETE post by id', function(done){
//         const id = 1
//         chai
//         .request(server)
//         .delete(`/api/v1/entry/${id}`)
//         .end((err, res)=>{
//             res.should.have.status(200)
//             res.body.should.have.a('object')
//             res.body.should.have.property('status')
//             res.body.should.have.property('message')
//             done()
//         })
//     })
// })
 
// })