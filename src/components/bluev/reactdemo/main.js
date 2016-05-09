var Content = require('./childs/content');
// var Footer = require('../common/reactcomponent/footer');
module.exports=React.createClass({
    displayName: 'Reactdemo',
    getInitialState:function(){
      return{
        txt:"1212121"
      }
    },
    change:function(){
        this.setState({txt:"222222"});
    },
    render:function(){
        return(
            <div className="main">
                <h1 onClick={this.change.bind(this)}>This is Main Component</h1>
                <Content data={this.state.txt}/>
            </div>
        );
    }
});