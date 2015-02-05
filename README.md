# insecure_composition
A highly inefficient work of art(/random array of pixels) that automatically adjusts itself based on viewer response (in terms of 'captivation period').

The pixels mutate by 10% at the end of each viewing: if a visit causes the average time spent looking to increase, the composition saves its current state before making further experimentations. If a visit causes the average time spent looking to decrease, the composition overwrites its most recent change.

Images are stored as base64 dataURLs in two .txt files (painting/altered_painting). Both will be generated + created when app.js is ran for the first time.


Setup:

Install node-canvas according to instructions @ https://github.com/Automattic/node-canvas

Change socket in views/index.ejs to reflect your URL (line 16)
