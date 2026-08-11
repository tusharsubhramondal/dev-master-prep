# Complete Angular Senior Developer Interview Master Guide — বিস্তারিত ব্যাখ্যাসহ অল-ইন-ওয়ান হ্যান্ডবুক

> **লক্ষ্য:** এই গাইডটি এমনভাবে বিস্তৃত ব্যাখ্যা, Zone.js, Change Detection Strategy (`OnPush`), Angular Signals (Angular 16/17+), Hierarchical Dependency Injection, RxJS Operators, NgRx Architecture, ControlValueAccessor (CVA) এবং Performance Tuning সহ তৈরি করা হয়েছে যাতে যে কেউ **Senior Angular Developer / Lead Engineer** পজিশনের ইন্টারভিউ ক্র্যাক করতে পারেন।

---

## 📑 সূচিপত্র (Table of Contents)

1. [Module 1: Angular Core Architecture & Standalone Components](#module-1-angular-core-architecture--standalone-components)
2. [Module 2: Change Detection & Angular Signals (Senior Masterclass)](#module-2-change-detection--angular-signals)
3. [Module 3: Dependency Injection (DI) & Hierarchical Injectors](#module-3-dependency-injection-di--hierarchical-injectors)
4. [Module 4: RxJS & Reactive Programming Masterclass](#module-4-rxjs--reactive-programming-masterclass)
5. [Module 5: State Management Architecture (BehaviorSubject vs NgRx)](#module-5-state-management-architecture)
6. [Module 6: Routing, Lazy Loading & Micro-frontends](#module-6-routing-lazy-loading--micro-frontends)
7. [Module 7: Advanced Forms (CVA), Security & Interceptors](#module-7-advanced-forms-cva-security--interceptors)
8. [Module 8: Real-World Senior Code Implementation Scenarios](#module-8-real-world-senior-code-implementation-scenarios)
9. [Module 9: Senior Level Interview Question Vault](#module-9-senior-level-interview-question-vault)

---

# Module 1: Angular Core Architecture & Standalone Components

### 1.1 NgModule বনাম Standalone Components (Angular 14+ / 17 Paradigm Shift)

Angular 14 থেকে **Standalone Components** আনা হয়েছে, যা `NgModule`-এর প্রয়োজনীয়তা দূর করেছে।

| ফিচার | NgModule Architecture | Standalone Architecture |
| :--- | :--- | :--- |
| **ডিক্লারেশন** | `app.module.ts`-এ `@NgModule({ declarations: [...] })` | `@Component({ standalone: true, imports: [...] })` |
| **Boilerplate** | অতিরিক্ত মডিউল ফাইল তৈরি করতে হয় | অত্যন্ত ক্লিন এবং কম ফাইল দরকার |
| **Lazy Loading** | `loadChildren: () => import('./mod').then(m => m.MyModule)` | `loadComponent: () => import('./comp').then(c => c.MyComp)` |
| **Tree-Shaking** | মডিউলের কারণে অনাবশ্যক কোড থেকে যেতে পারে | চমৎকার Tree-Shaking, বান্ডেল সাইজ অনেক ছোট হয় |

---

### 1.2 Component Lifecycle Hooks (এক্সিকিউশন ক্রম)

1. **`ngOnChanges`:** `@Input()` প্রপস পরিবর্তিত হলে (এমনকি `ngOnInit`-এর পূর্বেও প্রথমবার চলে)।
2. **`ngOnInit`:** কম্পোনেন্ট ইনিশিয়ালাইজ হলে ১ বার চলে (এপিআই কলের জন্য সেরা স্থান)।
3. **`ngDoCheck`:** কাস্টম চেঞ্জ ডিটেকশন চেকের জন্য (প্রতি চেঞ্জ ডিটেকশন সাইকেলে চলে)।
4. **`ngAfterContentInit`:** `<ng-content>` দিয়ে এক্সটার্নাল কনটেন্ট প্রজেক্ট হওয়ার পর ১ বার চলে।
5. **`ngAfterContentChecked`:** প্রজেক্ট করা কনটেন্ট চেক হওয়ার পর প্রতিবার চলে।
6. **`ngAfterViewInit`:** কম্পোনেন্টের ভিউ এবং চাইল্ড ভিউ (`@ViewChild`) লোড হওয়ার পর ১ বার চলে।
7. **`ngAfterViewChecked`:** ভিউ চেক শেষ হলে প্রতিবার চলে।
8. **`ngOnDestroy`:** কম্পোনেন্ট DOM থেকে মুছে যাওয়ার ঠিক আগে (RxJS Subscription Unsubscribe করার স্থান)।

---

### 1.3 ViewEncapsulation (`Emulated`, `None`, `ShadowDom`)
- **`Emulated` (Default):** Angular CSS ক্লাসে ইউনিক ডাইনামিক এট্রিবিউট (e.g., `_ngcontent-c0`) যোগ করে স্টাইল কন্টেইনারে সীমাবদ্ধ রাখে।
- **`None`:** কম্পোনেন্টের CSS গ্লোবালি পুরো অ্যাপ্লিকেশনে ছড়িয়ে পড়ে।
- **`ShadowDom`:** ব্রাউজারের নেটিভ Shadow DOM ব্যবহার করে এনক্যাপসুলেশন নিশ্চিত করে।

---

# Module 2: Change Detection & Angular Signals (Senior Masterclass)

### 2.1 Zone.js কীভাবে কাজ করে?
Angular ডিফল্টভাবে **Zone.js** নামক একটি লাইব্রেরি ব্যবহার করে। Zone.js ব্রাউজারের সমস্ত Asynchronous APIs (যেমন: `setTimeout`, `setInterval`, `fetch`, `addEventListener`) কে **Monkey-patch** করে।  
যখনই কোনো আসিনক্রোনাস কাজ সম্পন্ন হয়, Zone.js Angular-কে সিগন্যাল দেয় এবং Angular Root Component থেকে শুরু করে ট্রির নিচ পর্যন্ত **Dirty Checking** চালিয়ে UI আপডেট করে।

---

### 2.2 `Default` বনাম `OnPush` Change Detection Strategy

**ইন্টারভিউ প্রশ্ন: `ChangeDetectionStrategy.OnPush` কীভাবে পারফরম্যান্স বৃদ্ধি করে?**

- **`Default` Strategy:** অ্যাপের কোথাও কোনো ঘটনা ঘটলে Angular পুরো কম্পোনেন্ট ট্রির প্রতিটি কম্পোনেন্ট পুনরায় চেক করে (ধীরগতি)।
- **`OnPush` Strategy:** Angular এই কম্পোনেন্টের চেঞ্জ ডিটেকশন স্কিপ করে। এটি **শুধুমাত্র ৪টি বিশেষ ক্ষেত্রে** রিরেন্ডার হয়:
  1. যখন `@Input()` প্রপসের অবজেক্ট **রেফারেন্স পরিবর্তন** হয়।
  2. যখন কম্পোনেন্ট বা তার চাইল্ড থেকে কোনো Event Emitter ট্রিগার হয়।
  3. যখন ইমপ্লিসিটলি `AsyncPipe` ব্যবহার করা হয়।
  4. যখন ম্যানুয়ালি `ChangeDetectorRef.markForCheck()` বা `detectChanges()` কল করা হয়।

```typescript
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush Performance Optimization
})
export class UserCardComponent {
  @Input() user!: User;
}
```

---

### 2.3 Angular Signals (Angular 16/17+ Zoneless Reactive Revolution)

Signals হলো Angular-এর নতুন Fine-grained Reactivity সিস্টেম যা Zone.js ছাড়াই নির্দিষ্ট DOM নোড আপডেট করতে পারে।

- **`signal()`:** একটি ট্র্যাকযোগ্য রিঅ্যাক্টিভ ভ্যালু তৈরি করে।
- **`computed()`:** অন্যান্য সিগন্যালের ওপর নির্ভর করে মেমোরাইজড ভ্যালু তৈরি করে (Dependency auto-tracking)।
- **`effect()`:** সিগন্যাল পাল্টালে সাইড ইফেক্ট (যেমন: Logging বা LocalStorage update) চালায়।

```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-counter',
  template: `
    <h2>Count: {{ count() }}</h2>
    <h2>Double Count: {{ doubleCount() }}</h2>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = signal(0); // Writable Signal
  doubleCount = computed(() => this.count() * 2); // Computed Signal

  constructor() {
    // Effect signal পাল্টালে স্বয়ংক্রিয়ভাবে চলবে
    effect(() => {
      console.log('Current count is:', this.count());
    });
  }

  increment() {
    this.count.update(val => val + 1); // Signal Update
  }
}
```

---

# Module 3: Dependency Injection (DI) & Hierarchical Injectors

Angular-এর DI ইঞ্জিন হলো **Hierarchical Injection System**।

```
                  ┌───────────────────────────┐
                  │   NullInjector (Error)    │
                  └─────────────┬─────────────┘
                                │
                  ┌─────────────▼─────────────┐
                  │ Module/EnvironmentInjector│ (providedIn: 'root')
                  └─────────────┬─────────────┘
                                │
                  ┌─────────────▼─────────────┐
                  │      ElementInjector      │ (Component level providers:[])
                  └───────────────────────────┘
```

### 3.1 Resolution Modifiers (`@Optional`, `@Self`, `@SkipSelf`, `@Host`)

1. **`@Optional()`:** সার্ভিস না পাওয়া গেলে এরর না দিয়ে `null` রিটার্ন করবে।
2. **`@Self()`:** শুধুমাত্র বর্তমান কম্পোনেন্টের নিজের `ElementInjector`-এ সার্ভিসটি খুঁজবে।
3. **`@SkipSelf()`:** নিজের ইনস্ট্যান্স বাদ দিয়ে প্যারেন্ট ইনজেক্টর থেকে খোঁজা শুরু করবে।
4. **`@Host()`:** বর্তমান কম্পোনেন্ট থেকে শুরু করে তার Host Component পর্যন্ত খুঁজবে।

---

### 3.2 `InjectionToken` এবং `multi: true`
যখন কোনো ইন্টারফেস বা কাস্টম টাইপ অবজেক্ট ইনজেক্ট করতে হয় (যার ক্লাস নেই):

```typescript
export const API_CONFIG = new InjectionToken<ApiConfig>('api.config');

// HTTP Interceptors-এর মতো মাল্টি-প্রোভাইডার নিবন্ধনে:
{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true // একাধিক ইন্টারসেপ্টর অ্যারেতে যোগ করতে
}
```

---

# Module 4: RxJS & Reactive Programming Masterclass

### 4.1 Subject Types

- **`Subject`:** প্রাথমিক পব-সব (Pub-Sub) অবজেক্ট। নতুন সাবস্ক্রাইবাররা পুরোনো মান পায় না।
- **`BehaviorSubject`:** একটি **ইনিশিয়াল মান** ধরে রাখে এবং নতুন সাবস্ক্রাইবারকে সাথে সাথে **সর্বশেষ মানটি** দেয়।
- **`ReplaySubject`:** মেমোরিতে বিগত `N` সংখ্যক মান ক্যাশ করে রাখে এবং নতুন সাবস্ক্রাইবারকে সেই বিগত মানগুলো রিপ্লে করে।
- **`AsyncSubject`:** স্ট্রিম সম্পূর্ণ (Complete) হওয়ার পর কেবল **সর্বশেষ একটি মান** প্রকাশ করে।

---

### 4.2 Higher-Order Mapping Operators (গভীর তুলনা)

| অপারেটর | কাজ করার ধরন | ব্যবহারক্ষেত্র |
| :--- | :--- | :--- |
| **`switchMap`** | নতুন এমিশন আসলে আগের আনফিনিশড ইনার অবজারভেবল ক্যানসেল করে দেয় | **Search Typeahead / Autocomplete** (পুরোনো কুরি ক্যানসেল করতে) |
| **`mergeMap`** | একাধিক অবজারভেবল প্যারালালে চালাতে থাকে (কোনোটি ক্যানসেল করে না) | **Batch Requests** (একসাথে একাধিক স্বাধীন কাজ করতে) |
| **`concatMap`** | আগেরটি শেষ না হওয়া পর্যন্ত পরেরটি সারিবদ্ধভাবে (Sequential) বসিয়ে রাখে | **Order Execution** (ক্রম বজায় রাখা জরুরি হলে) |
| **`exhaustMap`** | আগেরটির কাজ চলাকালীন নতুন সব এমিশন ইগনোর/বাতিল করে | **Form Submit / Login Button** (বারবার ক্লিক করা আটকাতে) |

---

### 4.3 Memory Leak Prevention Strategies

RxJS Subscription মেমোরি থেকে আনসাবস্ক্রাইব না করলে মেমোরি লিক ঘটে।

**১. `takeUntilDestroyed()` (Angular 16+ Best Practice):**
```typescript
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

this.userService.getUsers()
  .pipe(takeUntilDestroyed()) // স্বয়ংক্রিয়ভাবে ngOnDestroy-এ আনসাবস্ক্রাইব করবে
  .subscribe(data => this.users = data);
```

**২. `AsyncPipe` (Template Level):**  
টেমপ্লেটে `*ngIf="users$ | async as users"` ব্যবহার করলে Angular নিজেই Sub/Unsub হ্যান্ডেল করে।

---

# Module 5: State Management Architecture (BehaviorSubject vs NgRx)

### 5.1 lightweight State: Service with BehaviorSubject
ছোট ও মাঝারি অ্যাপের জন্য রিডাক্সের প্রয়োজনীয়তা নেই।

```typescript
@Injectable({ providedIn: 'root' })
export class UserStore {
  private state$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.state$.asObservable();

  addUser(user: User) {
    const current = this.state$.getValue();
    this.state$.next([...current, user]); // Immutable Update
  }
}
```

### 5.2 Enterprise State: NgRx Store Pattern
বিশাল এন্টারপ্রাইজ প্রজেক্টে Predictable State, Time-travel debugging এবং Strict Immutability-র জন্য **NgRx Store** (Actions ➔ Reducers ➔ Selectors ➔ Effects) ব্যবহৃত হয়।

---

# Module 6: Routing, Lazy Loading & Micro-frontends

### 6.1 Functional Functional Guards (Angular 15+)
শ্রেণি ভিত্তিক গার্ডের বদলে এখন লাইটওয়েট **Functional Guards** ব্যবহার করা হয়:

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
```

---

# Module 7: Advanced Forms (CVA), Security & Interceptors

### ControlValueAccessor (CVA) কী?
যদি আপনি একটি কাস্টম রিইউজেবল কাউন্টার বা কালার পিকার বা ডেটপিকার উপাদান বানান যা Angular-এর `formControlName` বা `ngModel`-এর সাথে সরাসরি কানেক্ট হতে পারে, তবে আপনাকে **`ControlValueAccessor`** ইন্টারফেস ইমপ্লিমেন্ট করতে হবে।

---

# Module 8: Real-World Senior Code Implementation Scenarios

### Scenario 1: Real-time Search with RxJS (`debounceTime`, `distinctUntilChanged`, `switchMap`)

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [ReactiveFormsModule, AsyncPipe, NgFor],
  template: `
    <input [formControl]="searchControl" placeholder="Search products..." />
    <ul>
      <li *ngFor="let item of results$ | async">{{ item.name }}</li>
    </ul>
  `
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  results$!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),                   // ৩০০ms টাইপিং থামার জন্য অপেক্ষা
      distinctUntilChanged(),              // একই কুরি বারবার এড়াতে
      switchMap(term => {                  // পুরানো রিকোয়েস্ট ক্যানসেল করা
        if (!term?.trim()) return of([]);
        return this.http.get<any[]>(`/api/products?q=${term}`).pipe(
          catchError(() => of([]))          // এরর আসলেও স্ট্রিম লাইভ রাখা
        );
      })
    );
  }
}
```

---

# Module 9: Senior Level Interview Question Vault

### 🟢 Junior Level
- **Q: Angular-এর `@Input()` এবং `@Output()`-এর কাজ কী?**  
  **A:** `@Input()` প্যারেন্ট থেকে চাইল্ডে ডাটা পাঠায়। `@Output()` `EventEmitter` ব্যবহার করে চাইল্ড থেকে প্যারেন্টে ইভেন্ট ট্রিগার করে।

### 🟡 Mid Level
- **Q: `switchMap` এবং `mergeMap`-এর প্রধান পার্থক্য কী?**  
  **A:** `switchMap` নতুন এমিশন আসলে পুরানো পেন্ডিং সাবস্ক্রিপশন ক্যানসেল করে দেয় (Search-এর জন্য ভালো)। `mergeMap` কোনো ক্যানসেল করে না, সব সমান্তরালে চালায়।

### 🔴 Senior Level
- **Q: `Zone.js` বন্ধ করে (Zoneless Angular) কীভাবে পারফরম্যান্স অপটিমাইজ করবেন?**  
  **A:** Angular 16/17-এ `provideExperimentalZonelessChangeDetection()` বা **Angular Signals** এবং `OnPush` স্ট্র্যাটেজি ব্যবহার করে Zone.js ছাড়াই নির্দিষ্ট ফাইন গ্রেইনড ডম আপডেট করা সম্ভব।

---

> **🎉 অভিনন্দন!** আপনি Angular-এর একটি সম্পূর্ণ **Senior Level Master Handbook** অর্জন করেছেন।
