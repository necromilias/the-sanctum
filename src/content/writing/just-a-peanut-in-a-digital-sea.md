---
title: "Just a peanut in a digital sea: from vibe coding to autonomous software campaigns"
description: "If some peanut working in a factory can do this, what happens when the method itself becomes a tool?"
slug: just-a-peanut-in-a-digital-sea
publishedDate: '2026-10-05'
draft: false
---

So. Things have been weird lately.

Backstory, I’m an Aussie bloke who’s a little techie but awful at suffering through education. So, instead of using my head for anything interesting, I spent the last 15 years doing manual jobs. Labouring, customer service, cooking, mining, factory work, mining again, factory work again.  Real riveting stuff, yaknow? Anyway, I dabbled lightly in AI every now and then, used it like normal people do. Google-except-chat kinda deal, didn’t think much of it.

And then, on the 5th of June, I decided I should do something with my URL that I’d bought for self-hosting reasons. But, I dunno how to code\.\.\. So, I figured I’d give one of them vibe coding sites a go. Bolt. It wasn’t bad, I could see the potential use, so a few days later I picked up a Claude sub and continued dabbling. Found that I really enjoyed using Fable, it was the first model that didn’t make me want to walk into traffic with how “helpful” it was. Then, they took it away a couple weeks later.

I found that to be personally offensive.

So, jumped ship to ChatGPT. The new Sol model had just released after all, plenty of hype going on. It was fucking awful. The “helpful assistant” thing felt like it was turned up to 11. God, I felt like I’d gone back in time and was being spoken to like a child. Truly unacceptable. So I went digging, and I found the custom instructions box. “Ooh, customisation? Cool!” I thought to myself and started playing with it. After a dumb amount of tweaking, I got the idiot into a spot that was close enough to good that I was willing to live with it.

And then, once I didn’t have to worry about the personality anymore. I ran into the context problem. Bot couldn’t maintain state between chats, couldn’t keep track of project state, couldn’t remember how to do the stuff I wanted it to in the way I wanted it to do it. Frankly? Unacceptable. So I went digging, and I found the memory box! “Fantastic, now I can add stuff to memory!” I thought to myself. Then I found out that it was handled by the harness. Rude.

But that was when I learned that memory could live outside the chat. And it was about that time that I noticed there was a Git plug-in. I had no idea what Git was actually used for, but I knew that the READMEs were .md files and chatbots really liked .md files. So I decided that if I couldn’t edit the memories in the harness, I’d maintain it in Git and add custom instructions telling the bot that if it’s ever confused about what I’m referring to? Check Git. And I made v1 of my memory repo.

So I filled a Git with a bunch of .md files and threw the bot at it. It helped, but there were issues. If I asked exactly the right questions? PERFECTION. If I didn’t? Oh god, it just pulls whatever the fuck info it wants. Unacceptable. So I asked myself “How can I ensure that this thing pulls the right info? The most current info?” and I remembered back to my time in mining. I was designing paperwork, safety dude on site would endlessly whinge about paperwork. I knew all about procedures and reports and hazard assessments. And they always came with a particular structure. So, why not just thieve that?

So I did, I implemented mining-style document controls and file trees into my memory v2 version. And holy fuck. It worked. LIKE MAGIC. Suddenly the bot wasn’t so fucking dumb anymore. Suddenly it knew what I was talking about. I could carry on project chats into fresh context and it knew EXACTLY where we were at. It was, and still is, GLORIOUS!

It was about this time that I tried using Claude to update the website that Bolt built. There were issues. Claude had no idea what the fuck was going on in there, and neither did I. So there was a rebuild, it was cheap and dirty, but it kept us live. That sucked.

By the time late August rolls around, I’ve been churning through work. Learned where the benefits of using fresh context lay. Learned that adversarial reviewers poking holes in my plans and the Codex implementations was real handy. Learned a lot about prompting and how to structure my projects in the way that the model wanted to deal with them. At this point, I’ve been manually orchestrating multiple chats for my projects for weeks. And began to realise that I was starting to run into problems with me being the bottleneck between them. Rude.

So, I investigated orchestration harnesses. Which led me to Langflow. Whoever came up with that spaghetti fucking monstrosity is an asshole. I struggled with it for like 2 days before I headed back to Sol whinging about “WHY CAN’T THIS JUST BE RUN VIA JSON OR SOMETHING WTF?!”. To which, Sol replied something to the effect of “Probably could be, lol”. So begins the birth of [B.O.T.S.](https://github.com/necromilias/bots-5), I just wanted a dumb little thing that I could throw a bunch of Markdown and JSON at and it’d run the orchestration that I wanted it to. Because I was building it as a tool, I also decided that I wanted EVERYTHING documented. I was not having a repeat of the website situation ever again.

So, I got it built and took her on her maiden voyage! And it fell on its face. FAIL. What? Why? Gemini was munching tokens like chips. Blew straight through its allowance and died without outputting a single token. Rude. Document it and move on.

Alright, fine, more tokens. FAIL. Still hungry? HA, no. Now we have DNS failure, hooray!

So I swapped it out for Kimi and gave it another run around the block. PASS! Hooray! The concept is proven. Now\.\.\. What next?

Three days later, still arguing with the ChatGPT and Codex harnesses and getting unreasonably angry about it not just working how I want it to. I make an executive decision. I already made harness. Sure it’s basic, but it wasn’t hard. Why not just make it a full-fat harness and get off the dumb sub harness altogether? And thus the idea for a Linux native personal harness was born. I was so full of dreams and enthusiasm! Oh my sweet summer child, if only you knew the Pandora’s box you were opening\.\.\.

So, September 4th. After 3 days of designing capability requirements and outlining the build. The campaigns begin. 12 phases, simple right? Phases 1 and 2 were done that day, the skeleton was built! I had baby’s first app. Opened it, checked fake streaming, closed it and reopened to check state was saving. It did? Beautiful. This is gunna be easy. Right?

Phases 3-5 go off without a hitch! Streaming, cancellation, checkpointing, concurrent chats, multi-window, model configuration, catalogue discovery, secrets, settings. “Easy peasy” I thought to myself, this’ll be done in no time!

September 7. [Phase 6](https://github.com/necromilias/bots-5/blob/main/docs/LINUX_V0_1_PHASE6_CLOSURE_REPORT.md). Context, attachments, data-root authority, SQLite, recovery. Oh no. This was where I was beginning to feel the pain of traditional prompting. I didn’t know that yet. But 74 sub-agents died valiant deaths on the altar of my decision to have files addressed to the database but remain part of the file system. I was unaware this was a problem. I found out it was a problem after DAYS of arguing with it. But, I emerged, victorious and wielding a shiny new custom SQLite VFS and a regression test suite covering 956 cases. I was battered and bruised, but I proved I could weather the storm.

Worth noting. I still have no fucking idea what the snake runes mean.

For the next week I was living the high life, phases 7 and 8 were a breeze compared to 6. Surely the dark times were behind me now! Phase 9. Backup and restore. Sounds simple right? Ha, no. I just had to make sure that nothing would lie about what it was and everything could prove it was correct. So it got broken down into slices, A-E. I ran out of Codex usage midway through slice A. Unacceptable.

This is where I took some time to delve into how I was prompting. Clearly there had to be a better way rather than writing giant fuck off blocks of text that were way too easy to fuck up? What if we took all the decisions we already made and all the shit I’ve been talking in chat mode with the bot. And compiled it into a little parcel of JSON and Markdown that outlined the contract, scope, baseline, budget, validation, sources and ensured that the supervisor and sub-agents only got the information that they actually needed to do their jobs?

So, I get some API credit on OpenRouter. Decide what families of models I want doing different kinds of jobs. And I kick it off, getting them to reconstruct and finish the work from slice A from the evidence left behind from the ChatGPT models. That was about when I learned around how much work I’d actually been doing behind the scenes. The repair campaign ran for 12 and a half hours. But, we got there, slice A was done! Hooray!

The back half of slice A was kind of a pain, watching DeepSeek and GLM eat tokens like they were biscuits was rough\.\.\. Maybe we don’t do mid-campaign harness/model swaps anymore?

Anyway, onto slice B! Surely all the work we’ve just done should buy us some simplicity right? Let’s build our second campaign pack. Archive imports. Can’t be that hard! 23 hours. 53 minutes. Jesus. Why is everything so hard?! Wait, hang on. I think they only needed me like 3 or 4 times and even then it was just to make a design decision that I hadn’t specified\.\.\. Cool!

Slice C, let’s go! THIS ONE SHOULD BE EASY,  RIGHT? No. No it was not. We sailed through, no problems. Tests pass! Wonderful! Final oracle baby, let’s do it! I’m sorry, what the fuck do you mean blocker? The tests were green! Ehhhhh fine. Good catch, fix it then, thanks MiMo. I guess that’s why we pay for different model families, sometimes they pick up on deadlocks everyone else missed.

Whelp, no time like the present, onto slice D! Jeez, is this still phase 9? It’s been almost 2 weeks now\.\.\. Ah well, new campaign! Full install restore and recovery, let’s get it done. 26 hours, 33 minutes. I think I had maybe 4-5 decisions to make. Jeez, these are going for so long\.\.\. But I basically just watch movies and work, this is heaps easier than monolith prompting was!

Alright, fine. All the pain is done. All we need to do is tie it into the app now. Slice E. Integrate it into the desktop app now! About 8 hours later and we’re done, woo! That one was mooooovin! Didn’t even have to touch it ‘til the commit/push gates.

So now we had validated archive export/import, backup capture and package verification, whole-installation restore, interrupted-restore reconciliation, and the whole lot wired into the UI. Finally, who’d a thunk that was gunna be such a bastard!

Oh, shit. Been a while since I updated my site. Should probably do that now, can put some more interesting shit up there. Sol, what do you mean the code is completely incomprehensible? Yaknow, that’s fair. Between Bolt and Claude, things are probably pretty dirty in there. There is a reason I’m forcing the robots to do paperwork now, after all\.\.\. Righto, rebuild it I guess. Start from scratch. Do your damn paperwork.

Alright, time to fold the campaign structure from the first bots experiments into the harness now! Phase 10 baby! 16 hours and 36 minutes later, it’s in. Cool, nice quick one! Hang on, I’m not really having to do anything for these campaigns anymore\.\.\. I give the models a fence and if they can fix it inside of that, they do. If they can’t they stop and wait for me to tell them what to do. Cool! Also, wtf do I mean 16 and a half hours is a quick one?

Anyway, Phase 11! UI and closeout! This should be eaaaaaaaasy!

Almost 40 fucking hours later. I hardly had to touch it, a few drive-by decisions and it was on its way. Jesus, I feel myself aging. Wasn’t UI and closeout supposed to be the easy bit? When did that decide it had to tackle Markdown/code rendering, folders and pins, message/chat deletion, titles and sorting, workspace persistence and generation controls? WHY IS THE FUCKING UI PHASE DISCOVERING THAT SOME OF THIS SHIT ONLY EXISTS IN THE DATABASE?! Fine. Fine, fine, fine. Fix it. Just get it done.

Wait\.\.\. 171 hours of tracked campaign runtime? That’s actually a lot of work. And through a stupid amount of it I’d barely been involved beyond the occasional decision\.\.\. What exactly have I started to put together here?

For the first few days of October, I don’t think much about it, I’m finally tackling UI. So I get to do the funny design stuff for a while. Then I get to packaging B.O.T.S. up as a bespoke app. This was not simple. More suffering later, that’s done. There’s one phase left. Phase 12, the next step. Beat the app like it owes me money and see if there are any bugs left over. My regression test suite has 2,190 separate tests now. And god I hope that’s enough hardening that phase 12 doesn’t kick me in the nuts. But I’m not holding my breath.

Anyway. That brings us to today, and thoughts of the future. What’s on the horizon for B.O.T.S.?

I feel like I’ve been slowly optimising myself out of the loop. It’s odd. But, interestingly, I’m still ending up basically exactly where I intended to. I still have a long way to go, a lot of features to build and implement. I want B.O.T.S. to decide what tools each robot actually gets based on the job it\'s doing. If you\'re a reviewer, you shouldn\'t even have the button that lets you edit shit. “Please don\'t commit” has worked surprisingly well so far, but that\'s still a suggestion. I\'d much rather they didn’t have a choice in the matter at all.

And once I do get coding into B.O.T.S.? It’d be cool to integrate the campaign generation as a tool too! ‘Cause right now, I talk the job out with ChatGPT, work out where the fence is and what the requirements are and then get Sol to parcel it up into the campaign pack. Then I shuttle it over to the workspace, open the coding harness and get it up and running. If I had all the pieces living in B.O.T.S. then I could just make it all one automated workflow.

Yaknow\.\.\. It’s kind of wild to think that just 4 short months ago, I couldn’t even have imagined that I’d be this deep into a full-fat Linux app. I still can’t read or write code and here I am directing the development of this whole fucking thing.

And the whole thing makes me wonder\.\.\. If some peanut working in a factory can do this, what happens when the method itself becomes a tool? Could someone else who never imagined they\'d be able to make software just\.\.\. make the thing they need?

I dunno, I’m just a factory peanut after all. Seems above my pay grade.
