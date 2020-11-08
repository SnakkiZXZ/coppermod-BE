//const Eff = require("EffectsLib");

const d = extendContent(Wall, "dit", {
    
    setStats(){
        
    this.super$setStats();
    this.stats.remove(Stat.health);
    this.stats.add(Stat.health, "∞", "");
    
  }
    
});
d.update = true
d.buildType = () => extendContent(Wall.WallBuild, d, {
    
    update(){
        
        if(this.health < this.maxHealth){
            
            this.heal()
            
        }
        
    },
    
}) 