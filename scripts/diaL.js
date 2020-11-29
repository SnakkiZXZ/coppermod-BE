module.exports = {
    
    title(d, text, i){
        d.row();
        d.add(text).color(Pal.accent).padBottom(6).expandX().colspan(i);
        d.row();
        d.image().color(Pal.accent).expandX().height(3).fillX().colspan(i);
        d.row();
        
    },
    
    textFilder(table, text, ower){
        
        return table.add(text).update(cons(a => {if(a.getText() > ower){a.setText(ower)}})).addInputDialog();
        
    },
    
}