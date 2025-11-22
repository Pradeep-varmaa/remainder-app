'use client'
import { Input , Button, Card} from 'antd';
import style from './style.module.css'
import { useState, useEffect, SetStateAction } from 'react';

interface RemainderType {
  Activity: string;
  Link: string;
}

export default function Home() {

  const [remainder , setRemainder] = useState('')
  const [link , setLink] = useState('')
  const [data, setData] = useState<RemainderType[]>([]);

  useEffect(()=>{
    async function fetchdata() {
      const rawdata = await fetch('http://51.21.196.54:5005/remainder/getremainder');
      const data = await rawdata.json()
      setData(data)
      console.log(data)
    }
    fetchdata()
  },[])


  async function Submit() {
    if(!remainder|| !link ){
      return alert('Fill the Fields')
    }
    const senddata = await fetch('http://51.21.196.54:5005/remainder/setremainder',{
      method:'post',
      headers: {
      "Content-Type": "application/json"
    },
      body:JSON.stringify({"remainder": remainder,"link":link})
    })
    const data = await senddata.json()
    console.log(data)
    if(data.status!=200) alert('Error while processing')
    else alert('Successfully inserted')
  setRemainder('')
  setLink('')
  }

  function remainderinp(e:any){
    // console.log(e.target.value)
    setRemainder(e.target.value)
  }

  function linkinp(e:any){
    // console.log(e.target.value)
    setLink(e.target.value)
  }
  async function updateStatus() {
    
  }





  return (
    <>
      <div className={style.main_div}>
        <div className={style.sub_div}>
          <Input className={style.input} placeholder='Enter Remainder' onChange={remainderinp} value={remainder} required />
          <Input className={style.input} placeholder='Paste Link here' onChange={linkinp} value={link} required />
        </div>
        <Button className={style.button} onClick={Submit}>Submit</Button>
      </div>
      <div>
        <Card className={style.data_div}>
          {
            data.map((el, index)=>{
              console.log(index)
              return(
                <div key={index} className={style.data_subdiv}><p>{index+1}</p> <p>{el.Activity}</p> <a href={el.Link} target='_blank'>LINK</a> <Button onClick={updateStatus}>Complete</Button> </div>
              )
            })
          }
        </Card>
      </div>
    </>
  );
}
