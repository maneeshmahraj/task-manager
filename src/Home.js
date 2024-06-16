
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
const Home = () => {
  const TODO='TODO';
  const DOING='DOING';
  const DONE='DONE';

  const [value,setValue]=useState('');
  const [tasks,setTasks]=useState([]);
 const [dragTask,setDragTask]=useState(null);
 const [updateitem,setUpdateitem]=useState(null);
  const handleInput=(e)=>{
    setValue(e.target.value);
  }
  const handleKeyDown=(e)=>{
    if(e.keyCode===13)
      {
        if(updateitem)
          {
             let obj={
              title:value,
              status:updateitem.status,
              id:updateitem.id
             }
             const copylist=[...tasks];
             const filterList=copylist.filter((item)=>item.id!==updateitem.id);
             setTasks((prev)=>[...filterList,obj]);
              setUpdateitem(null)
          }
       else
       {
        const obj={
          title:value,
          status:TODO,
          id:Date.now()
        }
        setTasks((prevs)=>[...prevs,obj]);
       }
        setValue('')
      }
  }
 
  const handleDrag=(e,task)=>{
   setDragTask(task);
  }
 // console.log(dragTask);
 const handleDropAndDrag=(status)=>{
        let copytask=[...tasks];
        copytask=copytask.map((item)=>{
          if(item.id===dragTask.id)
            {
              item.status=status;
            }
            return item;
        });
        setTasks(copytask);
        setDragTask(null)

 }
  const handleOnDrop=(e)=>{
    
    let status=e.target.getAttribute('data-status')
    //console.log(status);
    if(status===TODO)
      {
        handleDropAndDrag(TODO);
      }
      else if(status===DOING)
        {
          handleDropAndDrag(DOING)
        }
        else if(status===DONE){
          handleDropAndDrag(DONE)
        }
  }

  const handleOnDrag=(e)=>{
       e.preventDefault();
  }
  const handleDeleteTask=(item)=>{
       let copyTask=[...tasks];
       copyTask=copyTask.filter((task)=>task.id!==item.id);
       setTasks(copyTask);
  }
  const handleUpdate=(task)=>{
    setUpdateitem(task);
    setValue(task.title)
  }

  return(
         <>
  <div className="container">
    <h1>Task Manager !</h1>
   
   <input 
   onChange={handleInput}
   onKeyDown={handleKeyDown}
   value={value}
   type="text"/>
      <div className="board">
        <div className="todo"
        data-status={TODO}
        onDrop={handleOnDrop}
        onDragOver={handleOnDrag}
        >
          <h2 className="todo-cul">Todo</h2>
          {
            tasks.length>0&&tasks.map((task)=>{
             
              
              return(
               <>
               {
                 task.status===TODO&&<div
                 draggable
                 onDrag={(e)=>{handleDrag(e,task)}}
                 key={task.id}
                 className="task-item">
                 {task.title}
                  <div className="btns">
                  <MdDeleteOutline onClick={(e)=>{handleDeleteTask(task)}} className="btn" />
                  <MdOutlineModeEditOutline onClick={(e)=>{handleUpdate(task)}} className="btn"/>
                  </div>
                </div>
               }
                 
               </>
              )
            })
          }
          
        </div>
          <div className="doing"
           data-status={DOING}
          onDrop={handleOnDrop}
          onDragOver={handleOnDrag}
          >
          <h2 className="doing-cul">Doing</h2>
          {
            tasks.length>0&&tasks.map((task)=>{
             
              
              return(
               <>
               {
                 task.status===DOING&&<div
                 
                 draggable
                 onDrag={(e)=>{handleDrag(e,task)}}
                 key={task.id}
                 className="task-item">
                 {task.title}
                  <div className="btns">
                  <MdDeleteOutline onClick={(e)=>{handleDeleteTask(task)}} className="btn" />
                  <MdOutlineModeEditOutline onClick={(e)=>{handleUpdate(task)}} className="btn"/>
                  </div>
                </div>
               }
                 
               </>
              )
            })
          }
          </div>
          <div className="done"
           data-status={DONE}
           onDrop={handleOnDrop}
           onDragOver={handleOnDrag}
          >
            <h2 className="done-cul">Done</h2>
            {
            tasks.length>0&&tasks.map((task)=>{
             
              
              return(
               <>
               {
                 task.status===DONE&&<div
                 onDrag={(e)=>{handleDrag(e,task)}}
                 draggable
                 key={task.id}
                 className="task-item">
                 {task.title}
                  <div className="btns">
                  <MdDeleteOutline onClick={(e)=>{handleDeleteTask(task)}} className="btn" />
                  <MdOutlineModeEditOutline onClick={(e)=>{handleUpdate(task)}} className="btn"/>
                  </div>
                </div>
               }
                 
               </>
              )
            })
          }
          </div>
   </div>
  </div>
      
       </>

  )
}

export default Home;