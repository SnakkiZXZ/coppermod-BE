//const Eff = require("EffectsLib");
const effectRadius = new Effect(90, e => {
    
    Draw.color(e.color, Color.white, e.fin());
    
    Lines.stroke(3.2 * e.fout());
    Lines.circle(e.x, e.y, e.rotation);
    
});

const p = extendContent(Block, "pro", {
    
});

p.update = true;
p.targetable = false;
p.solid = false;
//p.layer = Layer.power;
p.buildType = () => extend(Building, {
    
    radius: 0,
    range: 100,
    bust: 1,
    healting: true,
    pHeal: false,
    busting: false,
    shelded: false,
    heat: 0,
    
    loaded(){
        
        
        
    },
    
    title(d, text){
        d.row();
        d.add(text).color(Pal.accent).padBottom(10).expandX().colspan(6);
        d.row();
        d.image().color(Pal.accent).expandX().height(3).fillX().colspan(6);
        d.row();
        
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
        
        const dialog = new BaseDialog("Меню");
        dialog.setFillParent(false);
        
        const tabler = new Table();
        const checkA = new CheckBox("Ремонтный проектор")
        checkA.checked = this.healting
        const checkB = new CheckBox("Ускоряющий проектор");
        checkB.checked = this.busting
        const checkC = new CheckBox("Щитовой проектор");
        checkC.checked = this.shelded
        const checkP = new CheckBox("Авторемонт игрока")
        checkP.checked = this.pHeal
        const textt = new TextField(this.range);
        const texth = new TextField(this.bust);
        
        tabler.pane(cons(table => {
            
            //table settings
                
            table.add(new Label("Радиус действия")).left;
            table.add(textt).fillX().addInputDialog();
            
            table.row();
            
            table.add(new Label("Множитель ускорения")).left;
            table.add(texth).fillX().width(100).addInputDialog();
                
            table.row();
            table.add(checkA).colspan(2).left;
                
            table.row();
            table.add(checkB).colspan(2).left;
                
            table.row();
            table.add(checkC).colspan(2).left;
            
            table.row();
            table.add(checkP).colspan(2).left;
            //end table
        
        })).maxHeight(600).maxWidth(500).minHeight(300);
        
        //dialog.<table/cont>.image().width(4).fillX().center();
        
        
        //dialog settings
        
        dialog.cont.add(tabler)
        dialog.cont.row();
        dialog.buttons.button("закрыть", run(() => {
            
            this.range = textt.getText();
            this.bust = texth.getText();
            this.healting = checkA.isChecked();
            this.busting = checkB.isChecked();
            this.shelded = checkC.isChecked();
            this.pHeal = checkP.isChecked();
            
            effectRadius.at(this.x, this.y, this.range, this.team.color);
            
            dialog.hide();
         
        })).width(125);
        
    dialog.show();
        
    },
    
    /*placed(){
        
        this.super$placed();
        
    },*/
    
    update(){
        
        if(this.healting && this.radius > 0){
            
            Vars.indexer.eachBlock(this, this.radius, boolf(other => other.damaged()), cons(other => {
                    other.heal();
                    Fx.healBlockFull.at(other.x, other.y, other.block.size, Pal.heal);
                }));
            
        };
        
        if(this.busting && this.radius > 0){
            
            Vars.indexer.eachBlock(this, this.radius, boolf(other => true), cons(other => {
                
                other.applyBoost(this.bust, 10);
                
            }));
            
        };
        
        if(this.shelded && this.radius > 0){
            
            Groups.bullet.intersect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2, cons(bullet => {
                
                if(Mathf.within(bullet.x, bullet.y, this.x, this.y, this.radius) && bullet.team != this.team){
                    
                    Fx.absorb.at(bullet.x, bullet.y);
                    this.heat = 1;
                    bullet.absorb();
                    
                }
                
            }));
            
        };
        //heal player
        if(this.pHeal && Vars.player.unit().team == this.team){
            
            Vars.player.unit().heal()
            
        };
        
        //heating
        if(this.heat > 0){
            
            this.heat -= 0.02
            
        }
        else if(this.heat < 0){
            
            this.heat = 0
            
        };
        
        //radius change range
        this.radius = Mathf.lerpDelta(this.radius, this.range, 0.1);
        
    },
    
    draw(){
        
        this.super$draw();
        
        var color = this.team.color
        
        if(Core.settings.getBool("animatedshields") && this.radius > 0 && this.shelded){
            
            Draw.z(Layer.shields);
            Draw.color(color.cpy().set(Math.max(color.r, this.heat), Math.max(color.g, this.heat), Math.max(color.b, this.heat), 1));
            
            Fill.circle(this.x, this.y, this.radius);
            Draw.color();
            
        }
        else if(this.radius > 0 && this.shelded){
            
            Draw.color(color.cpy().set(Math.max(color.r, this.heat), Math.max(color.g, this.heat), Math.max(color.b, this.heat), 1));
            
            Draw.alpha(0.5);
            Fill.circle(this.x, this.y, this.radius);
            
            Draw.color(color.cpy().set(Math.max(color.r, this.heat), Math.max(color.g, this.heat), Math.max(color.b, this.heat), 1));
            
            Lines.stroke(2);
            Lines.circle(this.x, this.y, this.radius);
            Draw.color();
            
        };
        
    },
    drawLayer(){
        
        Draw.color(this.team.color);
        Draw.rect(Core.atlas.find("[#624200]copper-dit-top"), this.x, this.y);
        Draw.color();
        
    }
});
p.layer = Layer.power;