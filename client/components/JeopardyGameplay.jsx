import React from  'react';
import superagent from 'superagent';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TimerSpeed from './TimerV';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {grey900,blue300} from './../../node_modules/material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import MediaQuery from 'react-responsive';
import {Row,Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

var options=[];
export default class JeopardyGameplay extends React.Component {
    constructor()
    {
        super();
        this.state = {
            screen: false,
            choice:'',
            topic: [],
            i: 0,
            question:'',
            options:[],
            redisQues:'',
        };
        this.changeState=this.changeState.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount()
    {
        var thisCopy = this;  
        var socket = io('http://localhost:8081');
        socket.emit("jGamePlay",this.props.points);
        socket.on("question",function(msg)
        {
         thisCopy.setState({redisQues:msg.question});
        let questionData = [];
        questionData.push(msg);
        this.setState({topic: questionData});
    }.bind(this));
        console.log("component mounted");
        // superagent
        // .get('http://localhost:3000/topic?_limit=' + this.props.limit)
        // .end((err, res) => {
        //     console.log("processing");
        //     this.setState({topic: res.body});
        //     this.state.topic.map((ques)=>
        //         this.setState({question:ques.question})
        //         );
        // });
    }

    handleOnClick(e)
    {
        this.state.topic.map((topics) => {

            for (let option=0; option <= topics.options.length; option++)
            {
                e.target.parentElement.childNodes[option].disabled = true;
                if(e.target.parentElement.childNodes[option].innerText === topics.correctOption)
                {
                    e.target.parentElement.childNodes[option].style.backgroundColor = "green";
                }
            }
            if(e.target.innerText !== topics.correctOption)
            {
                e.target.style.backgroundColor = "red";
            }

        });
    }

    changeState()
    {
     options = [];
     if(this.state.choice=='')
     {
        this.state.topic.map((topics => {
            for(var i=0;i<topics.options.length;i++)
            {
                // options.push(<button onTouchTap={this.handleOnClick}
                //     style={{width: '50%', height:'100%',margin: '1px',textAlign:'center',
                //     backgroundColor:'#1A237E',color:'white',
                //     padding: '2px 2px 2px 2px',
                //    /* borderTopLeftRadius:'20px' ,borderTopRightRadius: '20px',
                //     borderBottomLeftRadius: '20px',borderBottomRightRadius: '20px',
                //     cursor: 'pointer',
                //     outline: '30px 30px 30px 30px',
                //     fontSize:'2px'
                // }}>
                options.push(topics.options[i]);

                //</button>);
            }
            this.setState({options:options});
        }));
         // <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4]} />;
     }
     this.setState({screen:true});
     this.setState({choice:options});
    // <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4]} />;
}

render() {

    const screenData = this.state.screen ?
    this.state.options:

    <div>
    <MediaQuery maxDeviceWidth={767} className="some-class">
    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480404062/buzzer_p754xp.png"
    alt="Image Not Available"
    style={{height:'10px',width:'10px',cursor:'pointer'}}
    onTouchTap = {this.changeState} />
    <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4,5,6,7]} />
    </MediaQuery>
    <MediaQuery minDeviceWidth={768} className="some-class">
    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480404062/buzzer_p754xp.png"
    alt="Image Not Available"
    style={{height:'20px',width:'20px',marginTop:'8px',cursor:'pointer'}}
    onTouchTap = {this.changeState} />
    <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4,5,6,7]} />
    </MediaQuery>
    </div>

    // const topicStruct =  this.state.topic.map((topics => {
    //     for(let indexQ=0; indexQ<=this.state.i; indexQ++)
    //     {
    //         if(indexQ == this.state.i)
    //         {
    //     //         return (
    //     //             <div>

    //     //              <MediaQuery minDeviceWidth='1224px'>
    //     //              <div className="cardTitle">
    //     //             <CardTitle titleStyle={{fontSize:'3px',width:'65px',margin:'2px',lineHeight:'4px'}}
    //     //             style={{height:10,padding:0}}
    //     //             title={topics.question}/>

    //     //         </div>
    //     //         </MediaQuery>
    //     //         <MediaQuery maxDeviceWidth='1224px' className="cardTitle">
    //     //             <CardTitle titleStyle={{fontSize:'1.5px',marginBottom:10,lineHeight:'3px'}}
    //     //             style={{height:10,padding:0}}
    //     //             title={topics.question}/>
    //     //         </MediaQuery>

    //     // </div>
    //     //  );

    //         }
    //     }
    // }));
    return (
        <div>

        <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
        <div className="some-class">
        <Card style={{width:'90%',height:'58px',marginTop:'-13px', marginLeft:'1.9px',backgroundColor:blue300}}>
        <CardTitle title={this.state.redisQues} style={{padding:"0px"}} titleStyle={{fontSize:"1.2px",lineHeight:"2px",textAlign:'justify',padding:'3px'}}/>
        {screenData}
        {this.state.options.map(i=> <button key={i} onTouchTap={this.handleOnClick}  label={i} style={{width:"45%", border:'1px', borderRadius:'1px',padding:'3px',margin: '0px' , textAlign:'center',
            backgroundColor:'#1A237E',color:'white', cursor: 'pointer', outline: '0px',
            fontSize:'1px'
        }}
        >{i}</button>)}

        </Card>
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
        <div className="some-class">
        <Card style={{width:'90%',height:'76px',margin:'auto',backgroundColor:blue300}}>
        <CardTitle title={this.state.redisQues} style={{padding:"0px"}} titleStyle={{fontSize:"2px",textAlign:'justify',padding:'3px',lineHeight:"2px",marginTop:"-10px"}}/>
        {screenData}
        {this.state.options.map(i=> <button key={i} onTouchTap={this.handleOnClick}  label={i} style={{width:"40%",height:'100%',marginTop: '6px',textAlign:'center',
            backgroundColor:'#1A237E',color:'white', padding: '3px',border:'1px', borderRadius:'1px', cursor: 'pointer', outline: '30px 30px 30px 30px',
            fontSize:'1px'
        }}
        >{i}</button>)}
        </Card>
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
        <div className="some-class">
        <Card style={{width:'90%',height:'100px',margin:'auto',backgroundColor:blue300}}>
        <CardTitle title={this.state.redisQues} style={{padding:"0px"}} titleStyle={{fontSize:"3px",textAlign:'justify',padding:'3px',lineHeight:"4px",marginTop:"-10px"}}/>
        <Row center="xs" style={{fontSize:"15px"}}> </Row>
        {screenData}
        {this.state.options.map(i=> <button key={i} onTouchTap={this.handleOnClick}  label={i} style={{width:"40%",height:'100%',marginTop: '6px',textAlign:'center',
            backgroundColor:'#1A237E',color:'white', padding: '3px',border:'1px', borderRadius:'1px', cursor: 'pointer', outline: '30px 30px 30px 30px',
            fontSize:'2px'
        }}
        >{i}</button>)}
        </Card>
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024} className="some-class">
        <Card style={{width:'90%',height:'70px',fontSize:'1px', backgroundColor:blue300, margin:'-7% auto'}}>
        <CardTitle title={this.state.redisQues} style={{padding:"0px",height:'28px',textAlign:'justify'}} titleStyle={{fontSize:"3px",lineHeight:"4px",margin:"10px"}}/>
        {screenData}
        {this.state.options.map(i=> <button key={i} onTouchTap={this.handleOnClick}  label={i} style={{width:"40%",height:'100%',fxed:'bottom', marginTop: '6px',textAlign:'center',
            backgroundColor:'#1A237E',color:'white', padding: '3px', border:'1px solid', borderRadius:'2px', cursor: 'pointer', outline: '30px 30px 30px 30px',
            fontSize:'2px'

        }}
        >{i}</button>)}

        </Card>
        </MediaQuery>

        </div>
        );
}
}
