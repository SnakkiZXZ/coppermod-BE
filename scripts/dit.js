//const Eff = require("EffectsLib");

const d = extendContent(Wall, "dit", {
    
    setStats(){
        
    this.super$setStats();
    this.stats.remove(BlockStat.health);
    this.stats.add(BlockStat.health, "∞", "");
    
  }
    
});
d.update = true
d.buildType = () => extendContent(Wall.WallBuild, d, {
    
    update(){
        
        if(this.health < this.maxHealth){
            
            this.heal()
            
        }
        
    }
    
}) 