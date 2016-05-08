var Content = require('./childs/content');
// var Footer = require('../common/reactcomponent/footer');
module.exports=React.createClass({
    displayName: 'Reactdemo',
    render:function(){
        return(
            <div className="main">
                <h1>This is Main Component</h1>
                <Content />
            </div>
        );
    }
});