//const Eff = require("EffectsLib");

const s = extendContent(Block, "scTester", {
    kek: "",
    
    init(){
        
        this.super$init()
        this.kek = "krekker"
        
    },
    
});
s.update = true
s.buildType = () => extend(Building, {
    
    tapped(){
        
        /*Group.build.each(Boolf(build => build.team != Vars.player.team), cons(build => {
            
            build.kill()
            
        }))*/
        
        print(this.block.kek)
        
    },
    
    draw(){
        
        this.super$draw();
        
        Draw.z(Layer.shields);
        Draw.color(this.team.color);
        
        if(Core.settings.getBool("animatedshields")){
            
            Fill.circle(this.x, this.y, 15);
            
        }
        
    }
    
}) 