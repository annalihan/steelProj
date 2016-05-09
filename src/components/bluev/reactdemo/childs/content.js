module.exports=React.createClass({
    build:function(){
      console.log(this.refs);
      return <p>build</p>;
    },


    render:function(){
        return(
            <div ref="content" className="content" style={{fontSize:"none"}}>
                <p>{this.props.data}</p>
                {this.build()}
            </div>
        );
    }
});