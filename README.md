# Core module for molecuel Framework

mlcl_core is the core module for the molecuel application framework. It's initialization is based on the mlcl_di Typescript dependency injection module.

The version 2.x branch supports Subjects and streams based on rxjs. 
Streams can be used as DataStreams. For example for save handlers and much more. The streams in this case works like a queue of handlers for a dataset.
Subjects can be used as EventEmitters (but should not be used too much).

The core module is initialized as real Singleton based on the dependency injection module.

### Init system

The init system is based on the stream feature of molecuel core described below but can be combined with a method decorator on a injectable class to set different init methods.

For example database initialization can have a higher priority ( lower init value ) or port listen directives can have higher priorities.

The code example show how it works internally ( this can be used by every molecuel module and this is just example code). For example a http module can have two or more init functions. The first to initialize the routes and the second one to add the port listener after some other init priorities have been initialized.

```js
import {di} from 'mlcl_di';
import {Subject, Observable} from '@reactivex/rxjs';
import {MlclCore, MlclMessage} from '../dist';
di.bootstrap(MlclCore);
let core = di.getInstance('MlclCore')

// this is normally part of a module and can be added via imports
@injectable
class MyInitTestClass {
  // sets the init priority to 20
  @init(20)
  public myinit(x) {
    return Observable.create(y => {
      setTimeout(function() {
        if(obs2Success) {
          obs1Success = true;
          y.next(x);
        } else {
          y.error(new Error('Wrong priority'));
        }
        y.complete();
      }, 100);
    });
  }
}
// this is normally part of a module and can be added via imports
@injectable
class MyInitTestClass2 {
  // sets the init priority to 10
  @init(10)
  public myini2t(x) {
    return Observable.create(y => {
      setTimeout(function() {
        if(!obs1Success) {
          obs2Success = true;
          y.next(x);
        } else {
          y.error(new Error('Wrong priority'));
        }
        y.complete();
      }, 100);
    });
  }
}
// this is the important part to run the complete init stream of the molecuel framework
await core.init();
```


### Subject example

```js
import {di} from 'mlcl_di';
import {Subject, Observable} from '@reactivex/rxjs';
import {MlclCore, MlclMessage} from '../dist';
di.bootstrap(MlclCore);
let core = di.getInstance('MlclCore')
let initSubject = core.createSubject('init');
initSubject.subscribe(function(msg: MlclMessage) {
    console.log(msg);
});
let msg = new MlclMessage();
msg.topic= 'test';
msg.message = 'hello world';
initSubject.next(msg);
```

### Stream example
```js
import {di} from 'mlcl_di';
import {Subject, Observable} from '@reactivex/rxjs';
import {MlclCore, MlclStream} from '../dist';
di.bootstrap(MlclCore);
let core = di.getInstance('MlclCore')
let testStream = core.createStream('teststream');
let obs1 = x=> Observable.create(y => {
  setTimeout(function() {
    if(obs2Success) {
      obs1Success = true;
      y.next(x);
    } else {
      y.error(new Error('Wrong priority'));
    }
    y.complete();
  }, 100);
});

let obs2 = x => Observable.create(y => {
  setTimeout(function() {
    if(!obs1Success) {
      obs2Success = true;
      x.firstname = 'Dominic2';
      y.next(x);
    } else {
      y.error(new Error('Wrong priority'));
    }
    y.complete();
  }, 500);
});
testStream.addObserverFactory(obs1, 50);
testStream.addObserverFactory(obs2, 10);

let myobs = Observable.from([{firstname: 'Dominic'}]);
myobs = testStream.renderStream(myobs);
myobs.subscribe(function(res) {
  console.log('got result');
}, function(err) {
  should.not.exist(err);
}, function() {
  console.log('execution of all observables completed');
});
```
## API Documentation

The current API Documentation can be found on <https://molecuel.github.io/mlcl_core/>
