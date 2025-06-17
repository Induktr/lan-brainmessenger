# BrainMessenger Design Documentation (Quality and Value System)

### 1. Introduction: Design as the Foundation of Value

**Name:** BrainMessenger Design System

**Description:** This design system defines the visual and functional standards for the BrainMessenger interface. Our goal is to create an interface that not simply looks good, but is also **intuitive, efficient, and accessible** (Principle 2: Value Creation), relying on the principles of **quality > quantity** (Principle 3) and **pragmatism** (Principle 12) in choosing solutions.

**Goal:** Ensure **consistency, reliability, and a positive user experience** across all platforms (Windows, Android, Web), making BrainMessenger a **useful ASSET** (Principle 10) for users.

**Principles guiding the design:**

*   **Value Creation (Principle 2):** Design must be functional and solve user tasks as conveniently and efficiently as possible.
*   **Quality > Quantity (Principle 3):** Focus on the refinement of key elements rather than a multitude of poorly thought-out details. Design must be **reliable** and **well-designed**.
*   **Pragmatism and Realism (Principle 12):** Choosing design solutions that are feasible considering technical constraints (e.g., animation optimization).
*   **Integrity (Principle 7):** Visual and functional integrity across all platforms.
*   **Health as a Foundation (Principle 5):** Attention to accessibility (WCAG) so that the design does not create excessive load (visual, cognitive) on the user.

### 2. Color Palette: The Visual Language of BrainMessenger

Colors are separated for Light and Dark modes, supporting theme switching ("Night Mode" feature). All colors are specified in HEX.

#### 2.1. Light Mode

| Category         | Color (HEX)        | Purpose                                   |
| :---------------- | :---------------- | :------------------------------------------- |
| **Primary Gradient** | `#A7F43A` → `#00C853` | Main gradient for accent elements ("Get Started" buttons, icons) |
| **Accent**        | `#FF6347`         | Accent elements (errors, important notifications) |
| **Secondary**     | `#00BFFF`         | Secondary buttons, links, interactive elements |
| **Success**       | `#96C93D`         | Confirmations, successful actions             |
| **Background**    | `#FFFFFF`         | Main background                                 |
| **Surface**       | `#F0F0F0`         | Cards, panels, message backgrounds             |
| **Text Primary**  | `#333333`         | Primary text                               |
| **Text Secondary**| `#4D4D4D`         | Secondary text, hints, metadata       |
| **Disabled**      | `#B0B0B0`         | Inactive elements                          |
| **Border**        | `#E8E8D9`         | Borders, separators                         |

#### 2.2. Dark Mode

| Category         | Color (HEX)        | Purpose                                   |
| :---------------- | :---------------- | :------------------------------------------- |
| **Primary Gradient** | `#F2F047` → `#1ED94F` | Main gradient for accent elements    |
| **Accent**        | `#FF6347`         | Accent elements (errors)                  |
| **Secondary**     | `#00BFFF`         | Secondary buttons, links                |
| **Success**       | `#96C93D`         | Confirmations, successful actions             |
| **Background**    | `#1A1A1A`         | Main background                                 |
| **Surface**       | `#333333`         | Cards, panels, message backgrounds             |
| **Text Primary**  | `#FFFFFF`         | Primary text                               |
| **Text Secondary**| `#D9E8D9`         | Secondary text, hints                   |
| **Disabled**      | `#4D4D4D`         | Inactive elements                          |
| **Border**        | `#B0B0B0`         | Borders, separators                         |

#### 2.3. Premium Feature Colors (Visual Highlighting of Value)

*   **Premium Accent:** `#FFD600` (Gold)
*   **Premium Secondary:** `#2196F3` (Blue)
*   Used for visually highlighting premium features (e.g., in neural connection animations, special UI elements), emphasizing their **additional value** (Principle 2, 10).

#### 2.4. Color Application (Examples)

*   **Welcome Screen (from screenshot):**
    *   Background: `#1A1A1A` (Dark Mode).
    *   "Get Started" Button: Gradient `#F2F047` → `#1ED94F`.
    *   Chat Icon: `#F2F047` (outline) with a white symbol inside.
    *   Text: `#FFFFFF` (Welcome to Brain Messenger), `#D9E8D9` (hint).
*   **Theme Switching:**
    *   Implemented via a global `themeMode` flag (`Light`/`Dark`).
    *   Example in React Native:
        ```jsx
        import { useColorScheme } from 'react-native'
        const themeMode = useColorScheme() === 'dark' ? 'Dark' : 'Light'
        const backgroundColor = themeMode === 'Dark' ? '#1A1A1A' : '#FFFFFF' // Example of background selection
        ```

#### 2.5. Color Usage Recommendations

*   **Gradients:** Use `#A7F43A` → `#00C853` or `#F2F047` → `#1ED94F` (depending on the theme) for key actions and accent elements that draw attention to **value** (Principle 2).
*   **Dark Theme:** Use `#1A1A1A` or `#212121` as the main background to reduce eye strain (related to Principle 5: Health).
*   **Contrast:** Always check text and element contrast to ensure **accessibility** (WCAG 2.1 AA) and compliance with Principle 7 (Integrity). Use tools like WebAIM Contrast Checker.

### 3. Typography: Readability as the Basis of Efficiency

**Font selection and its application are based on ensuring maximum readability and accessibility**, which is critical for effective information absorption and reducing cognitive load (related to Principle 5: Health and Principle 2: Value).

#### 3.1. Primary Font

*   **Family:** Roboto (Google Fonts)
*   **Fallback:** Sans-serif
*   **Reason:** High readability on different screen sizes, broad character support (multilingualism), open license, and availability.

#### 3.2. Sizes and Styles (Scale for Hierarchy)

| Level         | Size | Weight | Usage                                 |
| :-------------- | :----- | :--------- | :-------------------------------------------- |
| H1 (Heading)  | 24px   | Bold       | Main screen titles (e.g., "Chats") |
| H2 (Subheading)| 18px   | Medium     | Secondary titles, group names     |
| Body            | 16px   | Regular    | Main message text, chat list        |
| Caption         | 14px   | Regular    | Photo captions, message time, small text |
| Button          | 16px   | Medium     | Action button text                         |

**Notes:**

*   **Line Height:** Minimum 1.5 for body text to improve readability.
*   **Customization (Principle 2):** The user can choose an alternative font in settings (e.g., Open Sans) to adapt to their preferences.
*   **Accessibility:** Adherence to contrast and minimum font size for WCAG compliance.

### 4. Animations: Optimization and Meaning (Principle 12: Pragmatism)

Animations in BrainMessenger are used to enhance the user experience, provide visual feedback, and add liveliness to the interface. However, they must be **pragmatic, optimized** (<2 GB RAM), and **not create excessive load** (related to Principle 5: Health).

#### 4.1. Animation Principles

*   **Meaning:** Every animation must have a clear purpose – explain a transition, draw attention to something important, confirm an action.
*   **Smoothness:** Use `ease-in-out` or `ease-out` for natural movement.
*   **Optimization:** Animations should not slow down the interface or consume many resources. Duration is chosen for a balance between smoothness and speed.
*   **Accessibility:** Avoid overly fast or flashing animations that can cause discomfort or seizures in sensitive users.

#### 4.2. Animation List (Examples)

| Name            | Description                                    | Trigger                    | Parameters                  | Relation to Principles | Colors (Light/Dark)          |
| :------------------ | :------------------------------------------ | :------------------------- | :------------------------- | :----------------- | :-------------------------- |
| Slide Transition| Slide transition (Welcome Screen)              | Swipe/click on arrow      | 0.3 sec, slide left/right  | P2 (Onboarding)     | #96C93D / #96C93D           |
| Chat Opening       | Chat appears from bottom up                  | Click on chat in list      | 0.3 sec, ease-in-out       | P2 (Navigation)     | #00BFFF / #00BFFF           |
| Button Press      | Visual feedback on click (scaling down)    | Click on button             | 0.2 sec, scale             | P2 (Feedback)        | Gradient #F2F047→#1ED94F  |
| Message Sending  | Message appears with smooth fade-in    | Click "Send"           | 0.3 sec, fade-in           | P2 (Feedback)        | #96C93D / #96C93D           |
| Screen Transition| Screen slide right/left (basic navigation)| Navigation                  | 0.3 sec, slide             | P2 (Navigation)     | #B0B0B0 / #4D4D4D           |
| Icon Animation (Morph)| Icon transformation (e.g., mute → unmute)| Click (state toggle)| 0.4 sec, morph             | P2 (State)     | #FF6347 / #FF6347           |
| Ripple Effect on Press| Radial waves from press point (feedback)| Click on button/element    | 0.3 sec, ripple            | P2 (Feedback)        | #F2F047 / #F2F047           |
| Glitch Effect (Premium)| Text distortion for premium (visualization)| Subscription activation         | 0.2 sec, glitch            | P2, P10 (Highlight) | #FF6347 / #FF6347           |
| Neural Connections (Premium)| Pulsating lines (Asset visualization)| Premium screen              | 0.5 sec, pulse             | P2, P10 (Highlight) | #96C93D / #96C93D           |

#### 4.3. Implementation Examples (Code Snippets)

*   **CSS for Ripple Effect:**
    ```css
    .ripple {
      background: linear-gradient(45deg, #F2F047, #1ED94F); /* Or other colors/gradient */
      border-radius: 50%;
      animation: ripple 0.3s ease-out;
    }
    @keyframes ripple {
      to { transform: scale(2); opacity: 0; }
    }
    ```
*   **React Native for Animated Icon:**
    ```jsx
    import Animated from 'react-native-reanimated'; // Example library
    import Icon from 'react-native-vector-icons/MaterialIcons'; // Example library

    const color = themeMode === 'Dark' ? '#FFFFFF' : '#333333';
    // Create an animated Icon component
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    // Example usage with scale animation (assuming 'scale' is an Animated.Value)
    <AnimatedIcon name="volume-up" color={color} style={{ transform: [{ scale: scale }] }} />
    ```

### 5. Alignment and Grid: Structure and Order (Principle 9: System)

Using a consistent alignment system and a modular grid is the foundation for creating a **systematic, easily maintainable, and visually harmonious** interface (Principle 9: System).

*   **Base Grid:** 8px (base step for defining element sizes, padding, spacing). All values should be multiples of 8 (or 4 for very small elements).
*   **Alignment:**
    *   The principle of **visual hierarchy** is used: more important elements are placed higher or visually dominate.
    *   **Vertical flow:** Content on screens is organized from top to bottom: Title → Input Field → Action Button.
    *   **Horizontal alignment:** Elements in containers are aligned to the left (for LTR) or right (for RTL), unless centering is necessary (e.g., header titles).
    *   **Padding/Margin:** Values from the 8px scale (8, 16, 24, 32, 40, 48 px, etc.) are used to create clear spacing between elements and groups of elements.
*   **Adaptability and Responsiveness:** The design adapts to different screen sizes to ensure **value** (Principle 2) on any device.
    *   **Mobile devices:** 320px–767px (Usually single-column layout).
    *   **Tablets:** 768px–1023px (Possibly two-column layout, side panels).
    *   **Desktop:** 1024px+ (Wide layout, multi-column design, side panels).

### 6. Accessibility Principles (WCAG 2.1 AA): Design for All (Principle 5: Health, Principle 7: Integrity)

**Accessibility is not an option, but a fundamental requirement** (similar to Principle 5: Health as a Foundation) for creating a **holistic** (Principle 7) and **valuable** (Principle 2) product that everyone can use, regardless of their abilities or the technologies they use. We strive to meet WCAG 2.1 AA level.

*   **Color Contrast:** Text elements must have a minimum contrast ratio of 4.5:1 (for normal text) and 3:1 (for large text or icons) against the background. This is checked for both themes (Light/Dark).
*   **Keyboard Navigation:** All interactive elements (buttons, links, input fields) must be accessible for navigation using the keyboard (Tab, Shift+Tab) and activation (Enter, Space).
*   **Screen Reader Support:** Use semantic markup (HTML) and ARIA attributes to provide context and information to screen reader users (e.g., descriptions for icons, element states).
*   **Visual Focus Indicator:** For keyboard users, there must be a clear and visible indicator of the currently focused element (e.g., a blue outline `#007BFF`).
*   **Error Handling:** Error messages must be clear, understandable, and easily identifiable by users, including screen reader users.
*   **RTL Support (Right-to-Left):** The design adapts for languages with right-to-left writing direction (e.g., Arabic), including mirroring the layout, icons, and text (see DocLocIn.md).

### 7. Notes and Recommendations

*   **User Customization:** Remember that some aspects of the design (chat colors, fonts) can be changed by the user in settings. The design system must account for this flexibility.
*   **Testing on Real Devices:** All design components must be tested on various devices, with different screen resolutions and in different lighting conditions, to ensure their effectiveness and accessibility.
*   **Living Documentation:** This design system is a living document. It will be supplemented with new components, templates, and recommendations as the product evolves, reflecting the principles of **continuous improvement** (Principle 1) and a **systematic approach** (Principle 9).
*   **Design as part of the Kaizen Process:** Design decisions are analyzed and improved based on feedback and real usage, integrating into the overall Kaizen process (Principle 9, 14).