import React from 'react';
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';


const Alert = () => {
    const alerts = useSelector(state => state.alert)
      // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }
    return (
        <div className="alert-container">
            {alerts !== null && alerts.length > 0 && alerts.map(alert => (
                <motion.div key={alert.id} className='alert'    
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: .5, repeat: 1, repeatDelay: 3, repeatType: "reverse",}}
                >
                    {alert.alertType === "success" ? <i className="fas fa-check-circle"></i> : <i className="fas fa-exclamation-circle"></i>}
                    <small>{ alert.msg }</small>
                </motion.div>
            ))}
        </div>
    )
}

export default Alert;