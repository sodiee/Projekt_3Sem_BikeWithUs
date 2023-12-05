import supertest from 'supertest'
import chai from 'chai'

const assert = chai.assert

import express from '../Controller/Endpoints/admins.js'

describe('Test for endpoints', () => {
    
    it('should return  status 200', ()=>{
        supertest(express.admins).
        get('/')
    })

    it('should return  status 202', ()=>{
        supertest(express.booking).
        get('/api/overview/editBooking')
    })

});