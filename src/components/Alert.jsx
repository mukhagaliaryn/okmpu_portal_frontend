import React from 'react';
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AlertContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10000;
    
    .alert {
        max-width: 100%;
        padding: 10px;
        background-color: green;
        backdrop-filter: blur(10px);
        border-radius: 5px;
        box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
        display: flex;
        justify-content: center;
        align-items: center;
    
        i {
            display: inline-block;
            font-size: 26px;
            margin: 0 5px;
        }
        i.fa-check-circle { color: green; }
        i.fa-exclamation-circle { color: crimson; }
    
        small {
            display: inline-block;
            margin: 0 5px;
            color: white;
            font-weight: normal;
            font-size: 14px;
        }
    }

    @media screen and (max-width: 411px) {
        .alert-container {
            width: 100%;
            bottom: 10px;
            left: 50%;
            right: 0;
            transform: translateX(-50%);

            .alert {
                width: 90%;
                padding: 10px;
                margin: 1px auto;
            }
        }
    }
`;

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
        <AlertContainer>
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
        </AlertContainer>
    )
}

export default Alert;