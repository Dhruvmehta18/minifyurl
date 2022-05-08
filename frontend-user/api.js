import axios from 'axios';

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjUyZTdkZDgyN2ZjYzI5NTQxZGVlZDMiLCJpYXQiOjE2NDk5NTU4NzksImV4cCI6MTY0OTk3Mzg3OSwidHlwZSI6ImFjY2VzcyJ9.T8zluESG-iBtzhOGXF3yatheiEADK9hsQJgq1VXPgtI";
export default axios.create({
  baseURL: `http://localhost:3001`,
  headers:{
    Authorization: `Bearer ${token}`,
  }
});