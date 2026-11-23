// Portfolio Project Data
// Simple schema: id, title, date, description, folder, media

window.PORTFOLIO_DATA = [
  {
    "id": "rivian-vw",
    "title": "Engineering Intern, Electrical Systems",
    "organization": "Rivian and Volkswagen Group Technologies, Palo Alto, CA",
    "date": "05/2026–08/2026",
    "description": [
      "Designed an inrush current testing PCB using KiCad/Altium to emulate a worst-case 12V Li-ion battery or HSD connection, defining eFuse I2t curves and wire gauges across next-gen RV Tech EV architectures",
      "Engineered robust protection using LTC7003, NCV68261, MP28167, and NAND/NOR combinational logic circuits to safely manage 300A inrush firing from a 51,700uF capacitor bank, such as: OCP, OVP, RPP, fuse, and pre/discharge",
      "Developed a Python-based CAN bus message-injection tool interfacing with CANalyzer and PCAN to emulate zonal ECUs"
    ],
    "folder": "rivianvw",
    "media": [
      {
        "file": "BIB Final Presentation V2.pdf",
        "title": "Project Presentation",
        "context": "Capstone presentation delivered to rest of electrical systems teams covering all aspects of the project.",
        "category": "Reports & Documents",
        "type": "pdf",
        "size": "2.6 MB"
      },
      {
        "file": "BIB block diagram.png",
        "title": "System Block Diagram",
        "context": "Detailed block diagram illustrating power flow and hardware locks.",
        "category": "Architecture",
        "type": "png",
        "size": "245 KB"
      },
      {
        "file": "bib 3d view1.png",
        "title": "PCB 3D View 1",
        "context": "",
        "category": "CAD & 3D Models",
        "type": "png",
        "size": "158 KB"
      },
      {
        "file": "bib 3d view2.png",
        "title": "PCB 3D View 2",
        "context": "",
        "category": "CAD & 3D Models",
        "type": "png",
        "size": "211 KB"
      },
      {
        "file": "bib layout screenshot.png",
        "title": "PCB Layout",
        "context": "",
        "category": "PCB Design",
        "type": "png",
        "size": "316 KB"
      },
      {
        "file": "bench inrush schematics final.pdf",
        "title": "Schematic Plots",
        "context": "",
        "category": "Wiring & Schematics",
        "type": "pdf",
        "size": "403 KB"
      },
      {
        "file": "bench inrush.zip",
        "title": "KiCad Archive",
        "context": "All KiCad project files.",
        "category": "Source Files & Archives",
        "type": "zip",
        "size": "12.9 MB"
      }
    ]
  },
  {
    "id": "fsae-glv",
    "title": "Rear Low Voltage Lead",
    "organization": "Bronco Racing, Formula SAE Electric",
    "date": "10/2024–06/2026",
    "description": [
      "Architected the rear low voltage system with a 3.3/5/12/24V power tree, side dashboard, and electrical enclosure",
      "Designed the main rear IO PCB as a STM32 carrier-board for CAN telemetry, precharge, closed-loop PWM cooling control, BMS latch closing, safety-critical Shutdown Circuit monitoring, and low-side drivers",
      "Designed 420V test points to show HV system isolation from chassis-grounded LV system and ensure driver safety"
    ],
    "folder": "fsae_rearLVlead",
    "media": [
      {
        "file": "CAN bus routing.jpg",
        "title": "Chassis CAN Bus Routing & Topology",
        "context": "Twisted-pair differential CAN network layout illustrating node drop lengths, split termination resistors, and physical chassis wire paths.",
        "category": "Wiring & Schematics",
        "type": "jpg",
        "size": "2.5 MB"
      },
      {
        "file": "Rear GLV System Block Diagram old.png",
        "title": "Rear GLV Power Distribution Architecture",
        "context": "System-level block diagram defining power flows from the 12V GLV accumulator to telemetry, inverter gate drivers, and safety interlocks.",
        "category": "Architecture",
        "type": "png",
        "size": "403 KB"
      },
      {
        "file": "Rear IO Brainstorming.png",
        "title": "Rear IO Pin Mapping & Signal Allocation",
        "context": "Initial hardware pinout brainstorm balancing analog telemetry inputs, wheel speed pulse counters, and high-side MOSFET drive gates.",
        "category": "Architecture",
        "type": "png",
        "size": "1.5 MB"
      },
      {
        "file": "Rear GLV Box 3D Prints/Rear GLV Box 3D Print V0.jpg",
        "title": "3D Printed Prototype V0 — Spatial Mockup",
        "context": "Initial rapid FDM physical print to verify packaging clearance within the tight tubular chassis rear space frame.",
        "category": "Prototypes & Prints",
        "type": "jpg",
        "size": "2.7 MB"
      },
      {
        "file": "Rear GLV Box 3D Prints/Rear GLV Box 3D Print V1.jpg",
        "title": "3D Printed Prototype V1 — Internal Standoffs",
        "context": "First iteration integrating threaded PCB brass heat-set standoffs and connector cutouts.",
        "category": "Prototypes & Prints",
        "type": "jpg",
        "size": "441 KB"
      },
      {
        "file": "Rear GLV Box 3D Prints/Rear GLV Box 3D Print V2.jpg",
        "title": "3D Printed Prototype V2 — Wall Reinforcement",
        "context": "Iteration increasing sidewall rigidity and refining cable entry strain relief geometries.",
        "category": "Prototypes & Prints",
        "type": "jpg",
        "size": "3.1 MB"
      },
      {
        "file": "Rear GLV Box 3D Prints/Rear GLV Box 3D Print V3.jpg",
        "title": "3D Printed Prototype V3 — Vibration Isolation",
        "context": "Added perimeter rubber grommet mounts to protect internal electronics against chassis vibration.",
        "category": "Prototypes & Prints",
        "type": "jpg",
        "size": "3.1 MB"
      },
      {
        "file": "Rear GLV Box 3D Prints/Rear GLV Box 3D Print V4.jpg",
        "title": "3D Printed Prototype V4 — Heat-Set Insert Fitment",
        "context": "Pre-competition build in heat-resistant PETG with installed M3/M4 brass inserts and connector harness test-fit.",
        "category": "Prototypes & Prints",
        "type": "jpg",
        "size": "3.1 MB"
      },
      {
        "file": "Rear GLV Box CAD/Rear GLV Box CAD V2.png",
        "title": "Rear GLV Enclosure Early CAD Concept (V2)",
        "context": "Second-stage CAD model exploring connector pass-through orientations and mounting tab stress points.",
        "category": "CAD & Modeling",
        "type": "png",
        "size": "148 KB"
      },
      {
        "file": "Rear GLV Box CAD/Rear GLV Box CAD V4.STEP",
        "title": "Rear GLV Enclosure 3D CAD Assembly (STEP)",
        "context": "Complete 3D parametric solid model in standard STEP format, featuring mounting flanges, o-ring sealing groove, and wire gland ports.",
        "category": "CAD & Modeling",
        "type": "step",
        "size": "458 KB"
      },
      {
        "file": "Rear GLV Box CAD/Rear GLV Box CAD V5.png",
        "title": "Rear GLV Enclosure Final CAD Render (V5)",
        "context": "Final production CAD iteration optimizing structural ribbing, wall thickness for FDM printing, and lid retention screws.",
        "category": "CAD & Modeling",
        "type": "png",
        "size": "144 KB"
      },
      {
        "file": "Rear GLV Box Wiring Diagrams/Rear GLV Box Wiring Diagram V1.png",
        "title": "Rear GLV Harness Wiring Diagram — Rev V1",
        "context": "Initial concept wiring schematic establishing low-voltage power supply branches and sensor return paths.",
        "category": "Wiring & Schematics",
        "type": "png",
        "size": "147 KB"
      },
      {
        "file": "Rear GLV Box Wiring Diagrams/Rear GLV Box Wiring Diagram V2.png",
        "title": "Rear GLV Harness Wiring Diagram — Rev V2",
        "context": "Second harness draft detailing relay coils, flyback diodes, and cockpit kill-switch emergency loop wiring.",
        "category": "Wiring & Schematics",
        "type": "png",
        "size": "163 KB"
      },
      {
        "file": "Rear GLV Box Wiring Diagrams/Rear GLV Box Wiring Diagram V3.png",
        "title": "Rear GLV Harness Wiring Diagram — Rev V3",
        "context": "Third schematic revision incorporating fused distribution branches and auxiliary coolant pump interlocks.",
        "category": "Wiring & Schematics",
        "type": "png",
        "size": "253 KB"
      },
      {
        "file": "Rear GLV Box Wiring Diagrams/Rear GLV Box Wiring Diagram V4.png",
        "title": "Rear GLV Harness Wiring Diagram — Rev V4",
        "context": "Fourth schematic revision standardizing star grounding to prevent ground loop noise on sensor analog lines.",
        "category": "Wiring & Schematics",
        "type": "png",
        "size": "120 KB"
      },
      {
        "file": "Rear GLV Box Wiring Diagrams/Rear GLV Box Wiring Diagram V5.png",
        "title": "Rear GLV Harness Wiring Diagram — Rev V5",
        "context": "Fifth schematic revision incorporating verified pinouts for rear brake pressure transducer and CAN transceiver nodes.",
        "category": "Wiring & Schematics",
        "type": "png",
        "size": "114 KB"
      },
      {
        "file": "Rear GLV Box Wiring Diagrams/Rear GLV Box Wiring Diagram V6.png",
        "title": "Rear GLV Harness Wiring Diagram — Rev V6 (Final)",
        "context": "Final as-built chassis harness schematic specifying wire gauges (16–22 AWG), raychem DR-25 sleeving, and Deutsch connector pin numbers.",
        "category": "Wiring & Schematics",
        "type": "png",
        "size": "190 KB"
      },
      {
        "file": "Rear IO PCB/Rear IO PCB 3D.png",
        "title": "Rear IO Custom PCB — 3D Component Model",
        "context": "Rendered 3D model of the assembled PCB confirming connector clearance, decoupling capacitor placement, and heatsink clearance inside the enclosure.",
        "category": "PCB Design",
        "type": "png",
        "size": "313 KB"
      },
      {
        "file": "Rear IO PCB/Rear IO PCB Schematic_Enables.png",
        "title": "Rear IO Schematic: Switching & Enable Logic",
        "context": "High-side solid-state switching logic and opto-isolated gate drivers for pump control, cooling fans, and rear rain brake light circuits.",
        "category": "PCB Design",
        "type": "png",
        "size": "60 KB"
      },
      {
        "file": "Rear IO PCB/Rear IO PCB Schematic_Inputs.png",
        "title": "Rear IO Schematic: Sensor Signal Conditioning",
        "context": "Analog and digital input conditioning stages including RC low-pass filtering, pull-up resistors, and ESD diode arrays for wheel speed and suspension sensors.",
        "category": "PCB Design",
        "type": "png",
        "size": "51 KB"
      },
      {
        "file": "Rear IO PCB/Rear IO PCB Schematic_Root.png",
        "title": "Rear IO Schematic: Root & Power Regulation",
        "context": "Top-level schematic sheet detailing reverse-polarity protection, transient voltage suppression (TVS), and automotive buck regulation.",
        "category": "PCB Design",
        "type": "png",
        "size": "99 KB"
      },
      {
        "file": "Rear IO PCB/Rear IO PCB.png",
        "title": "Rear IO Custom PCB — 2D Layout",
        "context": "Two-layer PCB layout highlighting separated analog/digital ground planes, high-current power distribution traces, and automotive terminal footprinting.",
        "category": "PCB Design",
        "type": "png",
        "size": "328 KB"
      },
      {
        "file": "Side Dashboard Wiring Diagrams/Side Dashboard Wiring Diagram V2.png",
        "title": "Cockpit Side Dashboard Wiring Schematic — V2",
        "context": "Electrical schematic for auxiliary side controls, tractive system master switch, manual shutdown button, and low-voltage indicator lights.",
        "category": "Wiring & Schematics",
        "type": "png",
        "size": "94 KB"
      }
    ]
  },
  {
    "id": "robot-bartender",
    "title": "Autonomous Bartending Robot",
    "date": "01/2026–03/2026",
    "description": [
      "1st at SCU Mechatronics Competition 2026",
      "Engineered a fully autonomous robot to navigate a winding course and precisely manipulate 3 beer taps within 60s",
      "Developed C++ finite-state machine on Arduino Mega 2560 for PID line-following, PWM servos, and multi-sensor fusion",
      "Designed in Fusion 360, fabricated, and integrated custom 3D-printed, dual-servo beer tap manipulator"
    ],
    "folder": "autonomous_bartender",
    "media": [
      {
        "file": "1st place cups.jpg",
        "title": "Competition Verification: Precision Dispense Target",
        "context": "Macro photograph verifying liquid fill level and target positioning accuracy achieved during final competition judging.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "3.1 MB"
      },
      {
        "file": "1st place group.JPG",
        "title": "1st Place Award Presentation & Team Photo",
        "context": "Award ceremony following final live demonstration, capturing team presentation and first-place recognition.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "3.5 MB"
      },
      {
        "file": "assembling servo box.jpg",
        "title": "Arm Turret Assembly & Gearbox Integration",
        "context": "Bench assembly photo detailing mechanical fit of servo horns, metal drive gears, and internal wiring harnesses.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "2.1 MB"
      },
      {
        "file": "back.jpg",
        "title": "Rear View: Differential Drive & Caster",
        "context": "Rear perspective showing geared DC drive motors, high-friction silicone wheels, rear omnidirectional ball caster, and power toggle switch.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "4 MB"
      },
      {
        "file": "claws Fusion 360 CAD.png",
        "title": "Compliant Robotic Claw CAD Model (Fusion 360)",
        "context": "Parametric CAD design of the robotic claw mechanism with gear drive linkage and silicone-lined grip curvature to prevent cup deformation.",
        "category": "CAD & 3D Models",
        "type": "png",
        "size": "529 KB"
      },
      {
        "file": "claws prototype 1.jpg",
        "title": "Robotic Claw Prototype 1 — 3D Print Test",
        "context": "Initial physical print of the claw mechanism testing mechanical gear meshing and clamping force against various container diameters.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "178 KB"
      },
      {
        "file": "claws.f3d",
        "title": "Robotic Claw 3D CAD Source File (F3D)",
        "context": "Complete parametric Autodesk Fusion 360 CAD model file containing fully dimensioned sketches, joints, and assembly constraints for the claw.",
        "category": "CAD & 3D Models",
        "type": "f3d",
        "size": "691 KB"
      },
      {
        "file": "Color Sensing.pdf",
        "title": "Optical Color Sensing & Target Identification",
        "context": "Integration of optical color sensing ICs, ambient light compensation algorithms, and drink station classification via normalized RGB chromaticity.",
        "category": "Lab Reports & Docs",
        "type": "pdf",
        "size": "677 KB"
      },
      {
        "file": "first photo.jpg",
        "title": "Chassis Assembly Milestone — Initial Power-On",
        "context": "Early prototype build milestone verifying logic power rails, 5V regulator thermal dissipation, and motor spin direction.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "301 KB"
      },
      {
        "file": "front.jpg",
        "title": "Front View: Sensor Array & Gripper",
        "context": "Finished robot front profile showing ultrasonic rangefinders, infrared ground array, and frontal arm positioning.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "3.5 MB"
      },
      {
        "file": "Interrupts and Timers.pdf",
        "title": "Microcontroller Timers & Interrupt Architecture",
        "context": "Embedded C real-time system architecture: hardware PWM timer configuration, external interrupt handling for wheel encoders, and deterministic state transitions.",
        "category": "Lab Reports & Docs",
        "type": "pdf",
        "size": "454 KB"
      },
      {
        "file": "line following testing.jpg",
        "title": "Autonomous Line Navigation Track Testing",
        "context": "Course navigation testing validating closed-loop PID line-following on curved paths with varying lighting.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "2.3 MB"
      },
      {
        "file": "Platform Build and Motor Drivers.pdf",
        "title": "Platform Mechanical Build & Motor Driver Report",
        "context": "Comprehensive engineering report detailing chassis kinematics, differential drive gear ratios, dual H-bridge motor driver circuits, and power supply budgeting.",
        "category": "Lab Reports & Docs",
        "type": "pdf",
        "size": "548 KB"
      },
      {
        "file": "Positioning Motors.pdf",
        "title": "Closed-Loop PID Motor Positioning & Odometry",
        "context": "Technical paper analyzing quadrature encoder decoding, velocity estimation, and PID tuning parameters for millimetric positioning accuracy.",
        "category": "Lab Reports & Docs",
        "type": "pdf",
        "size": "1.8 MB"
      },
      {
        "file": "Sensor Calibration.pdf",
        "title": "Sensor Calibration Curves & Verification",
        "context": "Empirical calibration curves, sensor threshold histograms, and hysteresis filtering for robust navigation under dynamic ambient lighting conditions.",
        "category": "Lab Reports & Docs",
        "type": "pdf",
        "size": "1.4 MB"
      },
      {
        "file": "servo arm Fusion 360 CAD.png",
        "title": "Articulated Servo Arm CAD Design (Fusion 360)",
        "context": "Structural CAD rendering of the 3-DOF articulated robotic arm showing high-torque servo mounts, pivot bearings, and counterweight geometry.",
        "category": "CAD & 3D Models",
        "type": "png",
        "size": "152 KB"
      },
      {
        "file": "servo arm.f3d",
        "title": "Articulated Servo Arm CAD Source (F3D)",
        "context": "Autodesk Fusion 360 source design file with timeline history for the articulated servo lifting arm assembly.",
        "category": "CAD & 3D Models",
        "type": "f3d",
        "size": "202 KB"
      },
      {
        "file": "servo box Fusion 360 CAD.png",
        "title": "Servo Gearbox Base CAD Assembly (Fusion 360)",
        "context": "3D CAD model of the base housing that encloses the high-torque servo motors, power bus, and thrust bearing assembly.",
        "category": "CAD & 3D Models",
        "type": "png",
        "size": "323 KB"
      },
      {
        "file": "servo box.f3d",
        "title": "Servo Gearbox Base CAD Source (F3D)",
        "context": "Autodesk Fusion 360 source model file for the main turret and servo housing gearbox.",
        "category": "CAD & 3D Models",
        "type": "f3d",
        "size": "77 KB"
      },
      {
        "file": "testing.jpg",
        "title": "Full Subsystem Integration & Manipulation Test",
        "context": "Autonomous end-to-end mission test: navigating to station, identifying cup color, clamping, lifting, and dispensing without spillage.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "3.4 MB"
      },
      {
        "file": "top.jpg",
        "title": "Top-Down View: Microcontroller & Drive Electronics",
        "context": "Overhead view showing microcontroller developmental platform, dual H-bridge motor drivers, LiPo battery pack, and power bus.",
        "category": "Hardware & Testing",
        "type": "jpg",
        "size": "3.1 MB"
      }
    ]
  },
  {
    "id": "project-7",
    "title": "Robot Learning Research Analyst",
    "date": "12/2025 – 02/2026",
    "description": [
      "Directly shaped model iterations by translating empirical data into concrete feedback for inference teams",
      "Developed and established technical documentation to standardize model testing procedures and train team members",
      "Embedded with a frontier robotics foundation-model company under a PIIA (NDA)"
    ],
    "folder": "synphony",
    "media": [],
    "organization": "Synphony, San Mateo, CA"
  },
  {
    "id": "blindspot",
    "title": "BlindSpot - AI Assistive Wearable",
    "date": "03/2026–05/2026",
    "description": [
      "3rd at Hack for Humanity 2026, 1st at SCU INFORMS Pitchathon 2026",
      "Engineered $20 device for the visually impaired with real-time vision pipeline via React Native app, YOLOv8, and ElevenLabs",
      "Programmed ESP32-S3 Sense to stream AV data over Wi-Fi, featuring custom-soldered perfboard and 3D-printed enclosure"
    ],
    "folder": "blindspot",
    "media": [
      {
        "file": "1st place SCU INFORMS Pitchathon.jpg",
        "title": "1st Place Winner — SCU INFORMS Pitchathon",
        "context": "",
        "category": "Awards & Pitches",
        "type": "jpg",
        "size": "4.8 MB"
      },
      {
        "file": "3rd place Hack for Humanity.jpg",
        "title": "3rd Place Award — Hack for Humanity Hackathon",
        "context": "",
        "category": "Awards & Pitches",
        "type": "jpg",
        "size": "361 KB"
      },
      {
        "file": "pitch to Uri Levine.jpg",
        "title": "Executive Pitch to Waze Co-Founder Uri Levine",
        "context": "",
        "category": "Awards & Pitches",
        "type": "jpg",
        "size": "1.4 MB"
      },
      {
        "file": "prototype.jpg",
        "title": "Wearable Hardware Prototype",
        "context": "",
        "category": "Hardware Prototype",
        "type": "jpg",
        "size": "720 KB"
      },
      {
        "file": "Uri Levine workshop.jpg",
        "title": "Product Strategy & Mentorship Workshop Session",
        "context": "",
        "category": "Awards & Pitches",
        "type": "jpg",
        "size": "1.3 MB"
      }
    ]
  },
  {
    "id": "digital-ic-design",
    "title": "Digital IC Design Coursework",
    "organization": "Santa Clara University",
    "date": "01/2026–03/2026",
    "description": [
      "Transistor-level CMOS integrated circuit design, layout, and SPICE simulation of logic gates and full adders",
      "Synthesized and verified a 4-bit ripple-carry adder with DRC/LVS-clean physical silicon layout"
    ],
    "folder": "ecen153",
    "media": [
      {
        "file": "CMOS Inverter Layout.pdf",
        "title": "CMOS Inverter Silicon Physical Cell Layout",
        "context": "DRC/LVS clean layout showing n-well boundaries, p+ and n+ active regions, substrate/well taps to prevent latchup, and metal-1 power rail routing.",
        "category": "Coursework Reports",
        "type": "pdf",
        "size": "3.3 MB"
      },
      {
        "file": "CMOS Inverter.pdf",
        "title": "CMOS Inverter DC Characteristics & Noise Margins",
        "context": "",
        "category": "Coursework Reports",
        "type": "pdf",
        "size": "5 MB"
      },
      {
        "file": "Hierarchial Layout of XOR Gate.pdf",
        "title": "Silicon Layout & Parasitic Extraction: XOR Gate",
        "context": "Physical microelectronic layout of the XOR gate cell: diffusion sharing, poly interconnect optimization, and post-layout parasitic extraction verification.",
        "category": "Coursework Reports",
        "type": "pdf",
        "size": "5.1 MB"
      },
      {
        "file": "Hierarchical Design of a 4-bit Ripple-carry Adder (Main Project).pdf",
        "title": "Capstone Project: Hierarchical 4-bit Ripple-Carry Adder",
        "context": "",
        "category": "Coursework Reports",
        "type": "pdf",
        "size": "11.6 MB"
      },
      {
        "file": "Hierarchical Design of Two-Input XOR Gate.pdf",
        "title": "Two-Input XOR Gate Schematic & Delay Analysis",
        "context": "",
        "category": "Coursework Reports",
        "type": "pdf",
        "size": "2.7 MB"
      },
      {
        "file": "MOSFET Characteristics.pdf",
        "title": "MOSFET Device Characterization & Parameter Extraction",
        "context": "Experimental simulation and analytical study of I_DS vs V_DS curves, threshold voltage roll-off, channel length modulation (lambda).",
        "category": "Coursework Reports",
        "type": "pdf",
        "size": "7.2 MB"
      }
    ]
  },
  {
    "id": "gesture-memory-game",
    "title": "Gesture-Controlled Memory Game",
    "date": "10/2025–12/2025",
    "description": [
      "Designed and built an interactive hardware memory game powered by ultrasonic time-of-flight distance sensing",
      "Implemented contactless gesture-detection firmware with state-machine debounce logic and audio-visual feedback"
    ],
    "folder": "engr1",
    "media": [
      {
        "file": "first_prototype.jpg",
        "title": "Prototype",
        "context": "",
        "category": "Hardware Prototype",
        "type": "jpg",
        "size": "86 KB"
      },
      {
        "file": "Team 4 Summary Report_ Robot Project.pdf",
        "title": "Team Technical Summary Report & System Architecture",
        "context": "",
        "category": "Project Reports",
        "type": "pdf",
        "size": "2 MB"
      }
    ]
  }
];
