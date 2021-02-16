const power = 1;
const xscale = 0.7; // 0.7
const yscale = 2.5; // 2.5

export default class FlightPath {
    constructor({elementId='flightPath', gridInterval=50}) {
        this.canvas = document.getElementById(elementId);
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;

        this.gridInterval = gridInterval;
    }

    drawPath({ distance, hst, lsf, armspeed=1 }) {

        var color = 'hsl(346, 85%, 60%)';
        // var color_origin = 'hsl(60, 70%, 70%)';
        var color_origin = color;

        var pathContext = this.canvas.getContext('2d');
        let gradient = pathContext.createLinearGradient(this.canvas.width/2, this.canvas.height, this.canvas.width/2, distance);
        gradient.addColorStop(0, color_origin);
        gradient.addColorStop(1, color);
        
        pathContext.strokeStyle = gradient;
        pathContext.lineWidth = 4;
        
        var airspeed = armspeed;
        var ehst = hst;
        var elsf = lsf;
        var turnend = 0.8 - airspeed * airspeed * 0.36;
        var fadestart = 0.4 + (1 - airspeed * airspeed) * 0.3;
        var turnsign = 1; // RHBH
        
        var x, y;
        var oldX = this.canvas.width / 2;
        var oldY = this.canvas.height;
        var velocityX = 0.0
        var velocityY = -1.0;
        
        var deltaVelocity = yscale / (yscale * distance);
        
        ehst *= airspeed ** 4;
        elsf *= 1.0 / (airspeed * airspeed);
        
        if (airspeed > 0.8) {
            var op = (airspeed - 0.8) / 0.4;
            op *= op * 2;
            var dc = Math.max(0.0, (350 - distance)) / 10.0; // emphasize high-speed turn on sub-350ft discs
            ehst -= op * dc;
        }
        
        var yturn, yfade, ydistance;
        while (airspeed > 0) {
            y = oldY + velocityY;
            x = oldX + (velocityX * xscale);
            airspeed -= deltaVelocity;
    
            if (airspeed > turnend) {
                velocityX -= turnsign * (ehst / 14000) * (turnend / airspeed);
                yturn = this.canvas.height - y;
            }
            
            if (airspeed < fadestart) {
                velocityX -= turnsign * (elsf / 4000) * (fadestart - airspeed) / fadestart;
            } else yfade = this.canvas.height - y;
            
            if (airspeed > 0.0) {
                pathContext.beginPath();
                pathContext.moveTo(oldX, oldY);
                pathContext.lineTo(x, y);
                pathContext.stroke();
                
                oldX = x;
                oldY = y;      
            }
            /* console.log({x, y}); */
        }
        ydistance = this.canvas.height - oldY;
        
        let markerSize = 3;
        pathContext.strokeStyle = color;
        pathContext.fillStyle = color;
        pathContext.setLineDash([]); // solid line
        pathContext.beginPath();
        pathContext.arc(x, y, markerSize, 0, 2*3.1415926);
        pathContext.stroke();
        pathContext.fill();
        
        if(false) {
            pathContext.strokeStyle="#000";
            pathContext.beginPath();
            pathContext.moveTo((this.canvas.width/2)-20, this.canvas.height-ydistance);
            pathContext.lineTo((this.canvas.width/2)+20, this.canvas.height-ydistance);
            pathContext.stroke();
            pathContext.strokeStyle="#0ff";
            pathContext.beginPath();
            pathContext.moveTo((this.canvas.width/2)-20, this.canvas.height-yfade);
            pathContext.lineTo((this.canvas.width/2)+20, this.canvas.height-yfade);
            pathContext.stroke();
            pathContext.strokeStyle="#f0f";
            pathContext.beginPath();
            pathContext.moveTo((this.canvas.width/2)-20, this.canvas.height-yturn);
            pathContext.lineTo((this.canvas.width/2)+20, this.canvas.height-yturn);
            pathContext.stroke();
        }
    }
    
    drawGrid() {
        let context = this.canvas.getContext('2d');
        
        let gradient = context.createLinearGradient(this.canvas.width/2, this.canvas.height+100, this.canvas.width/2, 0);
        
        // gradient.addColorStop(0, 'hsl(180, 40%, 90%)');
        gradient.addColorStop(0.5, '#FFFFFF');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        context.lineWidth = 1;
        context.font = '12px sans-serif';
        context.fillStyle = '#A0A0A0';
        context.strokeStyle = '#A0A0A0';
        context.setLineDash([2, 4]);
        
        
        for(let i = this.gridInterval; i < (this.canvas.width - this.gridInterval/2); i += this.gridInterval*2) {
            context.beginPath();
    
            context.moveTo(i, 0);
            context.lineTo(i, this.canvas.height);
    
            context.stroke();
        }
    
        for(let i = this.gridInterval; i <= (this.canvas.height - this.gridInterval/2); i += this.gridInterval) {
            context.beginPath();
    
            context.moveTo(0, i);
            context.lineTo(this.canvas.height, i);
    
            context.stroke();
    
            context.textAlign = 'left';
            context.fillText((this.canvas.height-i)+"'", 0, i-3); // feet
            context.textAlign = 'right';
            context.fillText(Math.floor((this.canvas.height-i)/3.33)+"m", this.canvas.width, i-3); // meters
        }
    }
}