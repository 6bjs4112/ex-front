import './App.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';

function List({data,setData}){
  const remove = function(id) {
    // console.log(id)
    axios
    .delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
    .then(res=>{
      setData(res.data);
    })
  }
  return(
    <>
      {
        data.map(obj=>(
          <li key={obj.id}>
            {obj.msg}
            <button onClick={function(){remove(obj.id)}}>삭제</button>
          </li>
        ))
      }
    </>
  )
}

function Write({setData}){

  const insert = function(e){
    e.preventDefault();
    // console.log(e.target.msg.value); 인풋 값 들어오는지 확인
    let msg = e.target.msg.value;
    axios
    .post(`${process.env.REACT_APP_SERVER}/insert`,{msg})
    .then(res=>{
      setData(res.data);
    })
  }
  
  return(
    <div>
      <form onSubmit={insert}>
        <input type="text" name="msg" />
        <input type="submit" value="저장" />
      </form>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);

  const getData = function(){
    axios
    .get(`${process.env.REACT_APP_SERVER}/abc`)
    .then(res=>{
      setData(res.data);
    })
  }

  useEffect(function(){
    getData();
    //이 안에 넣는 이유? 
    // useState때문에 랜더링이 계속 발생하며 무한반복됨
    // 한번만 실행하게 하는것이 useEffect
  },[]);
  
  // axios
  // .get('http://localhost:3030/abc')
  //데이터 달라고 ↑주소에 요청 =>index.js를 보여줌
  // .get('https://port-0-jsonserver-6w1j2alm48bbon.sel5.cloudtype.app/abc')
  //↑클라우드 타입 사용해봄
  // .get(`${process.env.REACT_APP_SERVER}/abc`)
  //↑env환경설정 파일 사용해보기
  // .then(res=>{
  //   console.log(res);
  // })

  // axios
  // .post('http://localhost:3030/insert',{id:1000, name:'신규데이터'})

  return (
    <article>
      <div>
        <h2>한줄 댓글(<code>{data.length}</code>)</h2>
        <Write setData={setData}/>

        <ul>
          <List data={data} setData={setData}/>
          {/* setData는 수정을 위한 값, 바로 반영되서 보이게*/}
        </ul>
      </div>
      {/* <img src='./ditto.jpg'></img> */}
    </article>
  );
}

export default App;
