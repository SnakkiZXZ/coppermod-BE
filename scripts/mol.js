//const Eff = require("EffectsLib")

const m = extendContent(Block, "mol", {})

m.buildType = () => extend(Building, {
    
    update(){
        
        var x = this.x
        var y = this.y
        
        var core = Vars.state.teams.closestCore(x, y, this.team)
        
        var coreBlock = Vars.world.tileWorld(core.x, core.y)
        
        for(var i = 0; i < Vars.content.items().size; i++){
            
            var item = Vars.content.items().get(i)
            
            if(core.items.get(item) < 100000000){
            
                core.items.add(item, 1);
            
            }
            
        }
        
    },
    
});

m.update = true;