import "./Homepage.css"
import icon from './Images/icon.png'

export default function Homepage()
{
    return(
    <> 
        <div className = "topbarcontainer">
        <div className= "topbarLeft">
            <span className = "logo">CSB BANK</span>
            </div>
        
        <div className= "topbarCenter">
            <div className ="Searchbar">
                <input placeholder = "Search for transaction details" className = "SearchInput"/>
            </div>
            </div>
        <div className= "topbarRight">
            <div className = "topbarLinks">
            <span className = "topbarLink"></span>
            </div>
            <div className = "topbarIcons">
            <div className = "topbarIconItems">
                <span className = "topbarIconBadge"></span>
            </div>  
            </div>
            <img src ="" alt="" className = "topbarImg"/>
        </div>
        </div>
        <div className = "homeContainer">
        <div className="Sidebar">
            <div className="SidebarWrapper">
                <ul className="Sidebarlist">
                    <li><button className="sidebarButton">Deposit</button></li>
                    <li><button className="sidebarButton">Transfer</button></li>
                    <li><button className="sidebarButton">Check Balance</button></li>
                    <li><button className="sidebarButton">Withdraw</button></li>
                    <li><button className="sidebarButton">Loan</button></li>
                </ul>
            </div>
        </div>
        <div className="Feed">
            
            <div className="FeedWrapper"></div>
            <div className = "Profile">
            
            <div className = "ProfileRight">
                
                <div className = "ProfileInfo">
                    <div className = "ProfileRightTop"> 
                    <img className="ProfileUserImg" src={icon} alt="" />
                    </div>
                    <h2>Name:</h2>
                    <p>Age: </p>
                    <p>Account Number: </p>
                    <p>City: </p>
                </div>
               
            </div>
            </div>

        </div>
      
        </div>
    </>
    )
}
