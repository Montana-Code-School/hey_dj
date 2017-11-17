import test from 'ava';
import config from '../config';
import mongoose from 'mongoose';
import fakeController from '../server/controllers/fake'
test.before(()=> {
    mongoose.connect(config.db)
})

test("test tests", t=>t.pass())


test.cb("example test for", t => {
  const mockReq = {body: { data: 13}};
  const mockRes = { json: (data) => {
  	t.deepEqual(data, {route: 'fake'})
  	t.end()
  }}
  fakeController.fakeRoute(mockReq, mockRes)
});