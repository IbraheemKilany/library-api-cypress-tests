/// <reference types="cypress"/>

describe('apiTesting ', () => {
  const ISPN = Math.floor(Math.random() * 14445)
  const AISLE = Math.floor(Math.random() * 14445)

  const part1Names = ["John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava", "Alexander", "Isabella"];
  const part2Names = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Harris", "Davis", "Wilson", "Martin", "White"];
  const random1P = Math.floor(Math.random() * part1Names.length)
  const random2P = Math.floor(Math.random() * part2Names.length)
  const exeptedAuthor = `${part1Names[random1P]}${part2Names[random2P]}`

  it('test POST methood', () => {
    const requestBody = {
      name: "Qa private Zoom",
      isbn: ISPN,
      aisle: AISLE,
      author: exeptedAuthor
    }

    cy.request({
      method: "POST",
      url: "https://rahulshettyacademy.com/Library/Addbook.php",
      body: requestBody

    }).then((Response) => {
      cy.log(Response.body)

      expect(Response.status).to.eql(200)
      expect(Response.body.Msg).to.eql("successfully added")

    })


  })
  it('test GET method', () => {
    cy.request({

      method: "GET",
      url: `https://rahulshettyacademy.com/Library/GetBook.php?ID=${ISPN}${AISLE}`

    }).then((Response) => {

      expect(Response.status).to.eql(200)
      // expect(Response[0].body.author).to.eql(`${random1P}${random2P}`)
      expect(Response.body[0].author).to.equal(exeptedAuthor)
    })
  });
it('test DELETE method', () => {
  const requestBody={
    "ID":`${ISPN}${AISLE}`
  }
cy.request({
method:"DELETE",
url:"https://rahulshettyacademy.com/Library/DeleteBook.php",
body: requestBody
}).then( (Response) =>{
  expect(Response.status).to.eql(200)
  expect(Response.body.msg).to.eql("book is successfully deleted")

})


});


  });

