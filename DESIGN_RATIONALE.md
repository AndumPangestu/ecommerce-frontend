# Design Rationale: AI Chatbot for E-Commerce System

## Overview

The AI chatbot in this e-commerce system is designed as an **assistive sales agent** that helps users throughout the entire shopping journey—from product search and exploration, to comparison and checkout. In addition to text-based responses, every AI reply is always accompanied by **Suggestion Questions / Quick Replies** that are contextual, keeping the conversation flow active and well-directed.

This approach aims to:

- Reduce user **cognitive load**
- Speed up decision-making
- Increase engagement and conversion rates

---

## 1. Chatbot Placement Strategy (UI Design Rationale)

### Placement: Bottom-Right Corner

The chatbot is displayed in a compact size at the **bottom-right corner of the screen**, represented by a message icon.

### Rationale:

- Follows global design conventions for help and support features
- Does not interfere with the main e-commerce content
- Easily accessible at any time without forcing interaction
- Consistent experience across desktop and mobile devices

---

## 2. Chatbot Activation via Message Icon

### Rationale:

- The message icon is universally recognizable
- Minimizes the need for user onboarding
- Provides clear affordance as a support feature

---

## 3. Use of Suggestion Questions / Quick Replies

### Design Principle:

Every AI response **always includes suggestion questions** that:

- Are relevant to the current conversation context
- Guide users toward the next action
- Prevent dead-end conversations

### Benefits:

- Faster and more intuitive interactions
- Reduced input errors from users
- Helps users who are unsure what to type next

---

## 4. Handling Emotional or Vague User Input (Soft Selling Strategy)

### Scenario:

**User:**

> "I am tired"

### AI Response:

The AI responds empathetically and gently connects the user's emotional state with potential product needs.

> _"I hear you – those days can be tough! 🌧️ It sounds like you might need something cozy to lift your spirits. How about checking out some comfy dresses or loungewear?"_

### Suggestion Questions:

- "Show me comfy dresses"
- "I want loungewear"
- "Not now"

### Rationale:

- Maintains empathy without losing business objectives
- Gives full control to the user
- Encourages natural product exploration

---

## 5. Vague Product Search → Clarifying Questions

### Scenario:

**User:**

> "I want to buy a birthday gift for my girlfriend"

### AI Response:

The AI asks follow-up questions to better understand the user's needs.

> _"That's really sweet of you! 🎁 To help you find the perfect gift, could you tell me a bit more about her?"_

### Suggestion Questions:

- "She likes elegant style"
- "Casual fashion"
- "My budget is under $100"
- "Not sure yet"

### Rationale:

- Speeds up requirement discovery
- Avoids overly generic recommendations
- Mimics the behavior of a human sales assistant

---

## 6. Product Discovery & Filtering with Interactive Cards

### Scenario:

**User:**

> "Show me jackets under 1 million IDR"

### AI Response:

The chatbot displays **interactive product cards** containing:

- Product images
- Prices
- Available colors and sizes
- _Add to Cart_ button
- _View Details_ button (opens the product detail page for more information)

### Suggestion Questions:

- "Filter by size"
- "Show more colors"
- "Sort by price"
- "Compare jackets"

### Rationale:

- Reduces manual navigation
- Turns chat into a transaction entry point
- Accelerates the user journey from exploration to purchase

---

## 7. Product Comparison Assistance

### Scenario:

**User:**

> "What's the difference between these two jackets?"

### AI Response:

The AI presents a summarized comparison along with side-by-side product cards.

### Suggestion Questions:

- "Which one is warmer?"
- "Compare prices"
- "Add left one to cart"
- "Show similar jackets"

### Rationale:

- Reduces decision fatigue
- Helps users focus on key differences
- Enables next actions without leaving the chat

---

## 8. Size & Stock Availability Handling

### Scenario:

**User:**

> "Do you have this in medium?"

### AI Response:

> _"Good news! 🎉 The Floral Summer Dress is available in medium size. 🌺"_

### Suggestion Questions:

- "Add to cart"
- "Check other colors"
- "View size guide"

### Rationale:

- Uses positive language to maintain momentum
- Encourages immediate next actions
- Avoids passive responses that halt the conversation

---

## 9. Checkout Assistance

### Scenario:

**User:**

> "How do I apply my discount code?"

### AI Response:

The AI provides step-by-step guidance and offers a **voucher application simulation** directly within the chat interface.  
Instead of only explaining the steps verbally, the chatbot allows users to **practice applying the voucher in a guided, interactive manner**, closely mirroring the real checkout experience.

The simulation includes:

- A mock voucher input field inside the chat
- Real-time validation feedback (valid / invalid / expired)
- Immediate preview of the discounted price
- Clear indication of whether the voucher has been successfully applied

This approach enables users to understand the process before completing the actual checkout.

### Suggestion Questions / Quick Replies:

- "Try applying my voucher"
- "Go to checkout"
- "I have another code"
- "View my cart"

### Rationale:

- **Reduces cart abandonment**  
  Users often abandon carts due to uncertainty or fear of making mistakes during checkout. The simulation removes ambiguity by allowing users to experience the voucher process safely before committing.

- **Hands-on learning improves clarity**  
  Users learn faster by doing rather than reading instructions. Simulating voucher application makes the process intuitive and reduces confusion.

- **Minimizes user error during checkout**  
  By practicing in advance, users are less likely to incorrectly enter voucher codes or miss required steps in the real checkout flow.

- **Builds trust and system transparency**  
  Showing how the voucher affects pricing in real time increases confidence that the system is working fairly and accurately.

- **Shortens the decision-to-purchase cycle**  
  When users see immediate savings during the simulation, it reinforces purchase intent and encourages them to proceed to checkout.

- **Improves accessibility for less tech-savvy users**  
  The guided simulation lowers the barrier for users unfamiliar with e-commerce checkout processes.

---

## Conclusion

By combining:

- Non-intrusive chatbot placement
- Empathetic and contextual AI responses
- Suggestion Questions / Quick Replies in every interaction

This chatbot system is able to:

- Keep conversations engaging and continuous
- Guide users toward faster decisions
- Significantly improve engagement and conversion rates

The chatbot acts as a **virtual sales assistant** that is adaptive, responsive, and fully focused on delivering an excellent user experience.
