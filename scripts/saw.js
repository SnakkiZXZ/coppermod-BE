//const Eff = require("EffectsLib");
var unitGroup = [];
var teamGroup = [];
const s = extendContent(Block, "spawner", {
    
    init(){
        
        this.super$init();
        
        unitGroup = Vars.content.units()
        teamGroup = Team.baseTeams
    },
    
});
s.update = true;
s.targetable = false;
s.solid = false;
//s.layer = Layer.power;
s.buildType = () => extend(Building, {
    groupin: [],
    coord: new Vec2(),
    cordinate: [],
    check: false,
    triger: 60,
    teamG: Team.sharded,
    
    loaded(){
        
        for(var i = 0; i < unitGroup.size; i++){
            
            this.groupin[i] = new TextField("0")
            
        };
        
        for(var k = 0; k < 2; k++){
            
            this.cordinate[k] = new TextField((k == 0) ? this.coord.x : this.coord.y)
            
        }
        
    },
    
    title(d, text){
        d.row();
        d.add(text).color(Pal.accent).padBottom(10).expandX().colspan(6);
        d.row();
        d.image().color(Pal.accent).expandX().height(3).fillX().colspan(6);
        d.row();
        
    },
    
    
    teamCounter(table, b){
        
        table.button(new TextureRegionDrawable(Core.atlas.find("[#624200]copper-uni-" + b)), Styles.clearTogglePartiali, 37, run(() => {
        
        this.teamG = teamGroup[b]
    	
    })).size(50);
        
    },
    unitCounter(table, b){
        
        table.image(new TextureRegionDrawable(unitGroup.get(b).icon(Cicon.large))).size(40);
        table.add(this.groupin[b]).width(100).addInputDialog();
        
        if(b % 3 == 2){
            
            table.row()
            
        }
        
    },
    /*controlBut(table){
        
        table.button(new TextureRegionDrawable(Core.atlas.find("[#624200]copper-uni-arroy-1")), Styles.clearToggleTransi, 36, run(() => {
        
        this.triger++
    	
    })).size(70);
    
    table.button(new TextureRegionDrawable(Core.atlas.find("[#624200]copper-uni-arroy-3")), Styles.clearToggleTransi, 36, run(() => {
        
        this.triger--
    	
    })).size(70);
        
    },*/
    
    tapped(){
        
        this.loaded();
        
        
        const dialog = new BaseDialog("Меню");
        dialog.setFillParent(false);
        
        const tabler = new Table();
        const checkB = new CheckBox("режим спаунера");
        checkB.checked = this.check
        const textt = new TextField(this.triger)
        
        tabler.pane(cons(table => {
            
            //table settings
            
            this.title(table, "создать")
            
            for(var b = 0; b < unitGroup.size; b++){
            
                this.unitCounter(table, b)
            };
            
            this.title(table, "команда");
            for(var z = 0; z < teamGroup.length; z++){
                this.teamCounter(table, z)
            };
            
            this.title(table, "координаты")
                
                table.add(new Label("координата X")).colspan(3);
                table.add(this.cordinate[0]).fillX().addInputDialog();
                table.row();
                table.add(new Label("координата Y")).colspan(3);
                table.add(this.cordinate[1]).fillX().addInputDialog();
                
                table.add()
                
            this.title(table, "спаунер");
                table.add(checkB).colspan(4);
                table.row();
                table.add(new Label("задержка")).colspan(3);
                table.add(textt).fillX().addInputDialog()
            //end table
        
        })).maxHeight(600).maxWidth(500).minHeight(300);
        
        //dialog.<table/cont>.image().width(4).fillX().center();
        
        
        //dialog settings
        
        dialog.cont.add(tabler)
        dialog.cont.row();
        dialog.buttons.button("закрыть", run(() => {
            
            this.coord.x = this.cordinate[0].getText();
            this.coord.y = this.cordinate[1].getText();
            
            this.check = checkB.isChecked();
            this.triger = textt.getText();
            
            if(!checkB.isChecked()){
            for(var k = 0; k < unitGroup.size; k++){
                
                for(var c = 0; c < this.groupin[k].getText(); c++){
                    
                    unitGroup.get(k).spawn(this.teamG, this.coord.x * 8, this.coord.y * 8);
                    
                }
                
            };
            }
            
            dialog.hide();
         
        })).width(125);
        
    dialog.show();
        
    },
    
    placed(){
        
        this.super$placed();
        
        this.coord.x = this.x / 8;
        this.coord.y = this.y / 8;
        this.teamG = this.team;
        
    },
    
    update(){
        
        if(this.check && this.timer.get(this.triger)){
            
            for(var k = 0; k < unitGroup.size; k++){
                
                for(var c = 0; c < this.groupin[k].getText(); c++){
                    
                    unitGroup.get(k).spawn(this.team, this.coord.x * 8, this.coord.y * 8);
                    
                }
                
            };
            
        }
        
    },
   /* drawLayer(){
        
        Draw.color(this.teamG.color);
        Draw.rect(Core.atlas.find("[#624200]copper-dit-top"), this.coord.x * 8, this.coord.y * 8);
        Draw.color();
        
    }*/
}) 