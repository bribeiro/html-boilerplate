# CSS STANDARDS

## Ideaology ##
1. use this as your starting point for css projects
1. following naming conventions setup
    - try and follow twitter bootstrap naming conventions
1. add important reusable items/mixins for future projects


## Install ##
    gem install sass


## Compile/ Watch ##



### Option 1 ###
    sass -l --watch resources/css/src:resources/css/

### Option 2 ###
I'm normally in a python project, and am using fabric.  So I wrote up fabric scripts to watch and compress.  


    fab css.watch  
or compressed:  

    fab css.compile

