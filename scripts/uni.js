//var unit
var unitsGroup = [];
var teamsGroup = [];

const point = new Effect(30, e => {
    
    Draw.color(e.color);
    Draw.alpha(e.fslope())
    
    Draw.rect(Core.atlas.find("[#624200]copper-uni-point"), e.x, e.y);
    
})
const m = extendContent(Block, "uni", {
    
    init(){
        
        this.super$init();
        unitsGroup = Vars.content.units()
        teamsGroup = Team.baseTeams
        
    }
    
})

m.buildType = prov(() => extend(Building, {
    
    _pint: 0,
    
    _spawnAddX: [0, 8, 0, -8],
    _spawnAddY: [8, 0, -8, 0],
    
    _spawnX: 0,
    _spawnY: 0,
    
    addButtonTeam(i, table){
        
    
    table.button(new TextureRegionDrawable(Core.atlas.find(m.name + "-" + i)), 
    Styles.clearFulli, run(() => {
        
        //this.setTeam(Team.baseTeams[i]);
        this.team = teamsGroup[i]
    	//Vars.player.setTeam(Team.baseTeams[i])
    	Vars.player.team(teamsGroup[i])
    	
    })).size(40);
    
        
        
    },
    
    addButtonUnit(b, table){
        
        table.button(new TextureRegionDrawable(unitsGroup.get(b).icon(Cicon.small)), Styles.clearFulli, 26, run(() => {
        
        //contentUnit = Vars.content.units().get(b);
        //set(this.spawnX, this.spawnY)
        unitsGroup.get(b).spawn(this.team, this._spawnX, this._spawnY);
        
        /*unit = UnitTypes.dagger.create(this.getTeam());
        unit.set(this.x, this.y); 
        unit.add();*/
    	
    })).size(40);
    },
    
    addButtonControl(v, table){
        
        table.button(new TextureRegionDrawable(Core.atlas.find(m.name + "-arroy-" + v)), 
    Styles.clearFulli, run(() => {
        
        this._spawnX += this._spawnAddX[v];
        
        this._spawnY += this._spawnAddY[v]
    	
    })).size(40);
        
    },
    
    
    //button add
    buildConfiguration(table) {
        
        //Team
        for(var i = 0; i < teamsGroup.length; i++){
            
            this.addButtonTeam(i, table)
            
        };
     
    table.row();
    
     //unit
        for(var b = 0; b < unitsGroup.size; b++){
        
        this.addButtonUnit(b, table);
        
        if(b % 6 == 5){
            
            table.row()
            
        }
        
        };
        
    table.row();
    
    //control
        for(var v = 0; v < this.spawnAddX.length; v++){
            
            this.addButtonControl(v, table);
            
        }
        
        table.button(new TextureRegionDrawable(Core.atlas.find("error")), 
    Styles.clearFulli, 26, run(() => {
        
        Groups.unit.each(cons(unit => unit.kill()))
    	
    })).size(40);
    
    table.row()
    
    //new menu

    },
    
    
    loadTex(){
        
        this._spawnX = this.x;
        this._spawnY = this.y;
    
    },
    /*init(){
        
        //this.super$init();
        
        this.unitsGroup = Vars.content.units()
        this.teamsGroup = Team.baseTeams
        
    },*/
    
    update(tile){
        
        
        if(this._pint <= 0){
        this.loadTex()
        this._pint++
        }
        
        if(this.timer.get(30)){
        
        point.at(this._spawnX, this._spawnY, this.team.color)
        
        }
        
    }
    
}));
m.update = true;
m.configurable = true;